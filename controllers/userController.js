/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
import config from '../config';
import { sendMail, templates } from '../helpers/email';

dotenv.config();
const { JWT_SECRET } = config;

const generateToken = (payload, duration = undefined) =>
  jwt.sign({ ...payload }, JWT_SECRET, { expiresIn: duration });

export const signUp = async (req, res) => {
  try {
    const {
      body: {
        fullname,
        phone,
        email,
        password,
        username
      }
    } = req;
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        errors: ['This user already exists.']
      });
    }
    const user = await User.create({
      phone,
      email: email.toLowerCase(),
      fullname,
      username,      
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    });
    delete user._doc.password;
    return res.status(201).json({
      success: true,
      token: generateToken(user._doc),
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: ['An error occured, please try again.']
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const {
      body: { email, password }
    } = req;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        success: false,
        errors: ['Email or password is invalid.']
      });
    }
    delete user._doc.password;
    return res.status(200).json({
      success: true,
      token: generateToken(user._doc),
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error.message
    });
  }
};

export const socialSignIn = async (req, res) => {
  try {
    const {
      body: { email, name }
    } = req;
    const userExists = await User.findOne({ email: email.toLowerCase() || '' });
    if (userExists) {
      return res.status(200).json({
        success: true,
        token: generateToken(userExists._doc),
        user: userExists
      });
    }
    const newUser = await User.create({
      fullname: name,
      email: email.toLowerCase()
    });
    return res.status(200).json({
      success: true,
      token: generateToken(newUser._doc),
      user: newUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: ['An error occured, please try again.']
    });
  }
};

export const fetchUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const foundUser = await User.findOne({ _id: userId });

    if (!foundUser) {
      return res.status(400).json({
        message: `Could not find user with id: ${userId}`
      });
    }

    delete foundUser._doc.password;

    return res.status(200).json({
      message: `Found user ${foundUser.fullname}`,
      userData: foundUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: ['An error occured, please try again.']
    });
  }
};

export const editUser = async (req, res) => {
  try {
    const {
      user: userExists,
      body: { email, fullname, password, phone, newPassword, username }
    } = req;

    // check that password is correct
    if (
      (password || newPassword) &&
      !bcrypt.compareSync(password, userExists.password)
    ) {
      return res.status(400).json({
        success: false,
        errors: ['Incorrect password']
      });
    }

    // check that email is not taken
    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (
      emailExists &&
      userExists._id.toString() !== emailExists._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        errors: ['This email already exists, kindly select another']
      });
    }

    userExists.email = `${email || userExists.email}`.toLowerCase();
    userExists.fullname = fullname || userExists.fullname;
    userExists.username = username || userExists.username;
    userExists.password =
      password && newPassword
        ? bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
        : userExists.password;
    userExists.phone = phone || userExists.phone;

    const user = await userExists.save();
    delete user._doc.password;

    return res.status(202).json({
      message: 'User profile updated successfully',
      data: user,
      token: generateToken(user._doc)
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      errors: ['An error occured, please try again.', error]
    });
  }
};


export const recoverPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'The email does not exist' });
    }
    const token = generateToken(user, '1h');
    const mailOptions = {
      email,
      link: `https://ezewholesale.com/reset-password?token=${token}`,
      message: `
        Hi ${user.fullname}, <br/>
        You requested to change your password. Please click the link below to change it.
      `,
      footer: `You received this email because you requested to change your password.
        If you did not, please ignore this email.`,
      template: templates.passwordReset
    };
    sendMail(mailOptions);
    const message =
      'A link to change your password has been sent to your email, it expires in 1 hour.';
    return res.status(200).json({ message });
  } catch ({ message }) {
    return res.status(500).json({
      success: false,
      errors: [message]
    });
  }
};

export const resetPassword = async (req, res) => {
  const {
    body: { password },
    params: { token }
  } = req;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    await User.findOneAndUpdate(
      { _id: decoded._id },
      { password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)) },
      { new: true }
    );
    return res.status(200).json({
      message: 'Your password has been successfully updated'
    });
  } catch ({ message }) {
    return res.status(401).json({
      success: false,
      errors: [message]
    });
  }
};
