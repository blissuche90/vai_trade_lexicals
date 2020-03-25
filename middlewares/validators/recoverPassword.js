import { check } from 'express-validator/check';

export const recoverPassword = [
  check('email')
    .isString()
    .withMessage('Email field is required')
    .isEmail()
    .withMessage('Email must be a valid email')
];

export const resetPassword = [
  check('password')
    .isString()
    .withMessage('A password string is required')
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be at least 6 and not more than 30 characters'),
  check('confirmPassword')
    .isString()
    .withMessage('confirmPassword string is required')
    .custom(
      (confirmPassword, { req: { body } }) => body.password === confirmPassword
    )
    .withMessage('Passwords do not match')
];
