import { check } from 'express-validator/check';

export default [
  check('data.issues')
    .isArray()
    .withMessage('Issues field should be an array of issues'),
  check('data.images')
    .isArray()
    .withMessage('Images field should be an array of image urls'),
  check('data.comment')
    .not()
    .isEmpty()
    .withMessage('The comment field is required'),
  check('orderId')
    .not()
    .isEmpty()
    .withMessage('Please select an order to open a dispute for.')
];
