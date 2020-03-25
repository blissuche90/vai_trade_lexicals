import { check } from 'express-validator/check';

const validTypes = ['buyRequest', 'sellRequest', 'filledBuy', 'filledSell'];
export default [
  check('page')
    .isNumeric()
    .optional()
    .withMessage('Page query should be a number')
    .custom(page => page >= 0)
    .withMessage('Page should be a positive number'),

  check('limit')
    .isNumeric()
    .optional()
    .withMessage('Limit query should be a number')
    .custom(limit => limit >= 0)
    .withMessage('Limit should be a positive number'),

  check('type')
    .isString()
    .optional()
    .withMessage('Type query should be a string')
    .isIn(validTypes)
    .withMessage(`Type query should be one of: ${validTypes}`)
];
