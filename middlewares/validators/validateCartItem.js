import { check } from 'express-validator/check';
import { validateSellOrder } from './validateSellOrder';

export const validateCartItem = [
  ...validateSellOrder,
  check('id')
    .isMongoId()
    .optional()
    .withMessage('Cart item ID is invalid'),
  check('quantity')
    .isNumeric()
    .optional()
    .withMessage('Quantity should be a number')
    .custom(value => value > 0)
    .withMessage('Quantity must be greater than zero'),
  check('imeiNumbers')
    .isArray()
    .optional()
    .withMessage('imeiNumbers should be an array')
    .custom(imeiNos => imeiNos.every(item => typeof +item === 'number'))
    .withMessage('IMEI numbers should contain only numbers')
];
