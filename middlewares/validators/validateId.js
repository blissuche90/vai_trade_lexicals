import { check } from 'express-validator/check';

export default [
  check('id')
    .trim()
    .isMongoId()
    .withMessage('Invalid id in parameter')
];
