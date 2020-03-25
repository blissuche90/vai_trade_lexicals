import { check } from 'express-validator/check';

export default [
  check('name')
    .not()
    .isEmpty()
    .withMessage('The name field is required'),

  check('email')
    .not()
    .isEmpty()
    .withMessage('The email field is required'),

  check('subject')
    .not()
    .isEmpty()
    .withMessage('A Subject is required'),

  check('body')
    .not()
    .isEmpty()
    .withMessage('Body is required')
];
