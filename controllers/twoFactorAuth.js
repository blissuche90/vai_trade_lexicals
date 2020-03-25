import messageBird from 'messagebird';
import config from '../config';

const messageBirdConfig = messageBird(config.MESSAGE_BIRD);

export const verifyUserPhoneNumber = async (request, response) => {
  try {
    const { phoneNumber } = request.body;
    messageBirdConfig.verify.create(phoneNumber, (error, resp) => {
      if (error) {
        return response.status(400).json({
          message: error.message
        });
      }
      return response.status(201).json({
        message: 'Verification successful',
        token: resp
      });
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      errors: [error.message]
    });
  }
};

export const verifyOTP = async (request, response) => {
  try {
    const { id, token } = request.body;
    messageBirdConfig.verify.verify(id, token, (error, resp) => {
      if (error) {
        return response.status(400).json({
          message: 'An error occurred verifying your OTP'
        });
      }
      return response.status(201).json({
        message: 'Successfully verified phone number!',
        data: resp
      });
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      errors: [error.message]
    });
  }
};
