import { check } from 'express-validator/check';

export const validateWaitlist = [
  check('companyName', 'A valid company name is required')
  .exists()
  .isString()
  .isLength({ min: 2, max: 30 }),

  check('email', 'A valid email is required')
  .exists()
  .isString()
  .isEmail()
  .isLength({ min: 5, max: 30 }),

  check('companyType', 'A company type is required')
  .exists()
  .isString(),
];
