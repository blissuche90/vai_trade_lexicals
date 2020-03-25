import { check } from 'express-validator/check';
import { orderStatus } from '../../constants';

export default [
  check('id')
    .trim()
    .isMongoId()
    .withMessage('Invalid id in parameter'),
  check('status')
    .isString()
    .withMessage('Status field should be a string')
    .isIn(orderStatus)
    .withMessage(`Type query should be one of: ${orderStatus}`)
];
