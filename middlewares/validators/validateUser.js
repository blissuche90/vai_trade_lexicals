import { check } from 'express-validator/check';

export const signup = [
  check('fullname', 'A valid name is required')
    .exists()
    .isString()
    .isLength({ min: 2, max: 30 }),
  check('email', 'A valid email is required')
    .exists()
    .isString()
    .isEmail()
    .isLength({ min: 5, max: 30 }),
  check('password', 'A valid password of at least 6 characters is required')
    .exists()
    .trim()
    .isString()
    .isLength({ min: 5, max: 30 })
];
export const signin = [
  check('email', 'A valid email is required')
    .exists()
    .isString()
    .isEmail()
    .isLength({ min: 5, max: 30 }),
  check('password', 'A valid password is required')
    .exists()
    .trim()
    .isString()
    .isLength({ min: 5, max: 30 })
];
