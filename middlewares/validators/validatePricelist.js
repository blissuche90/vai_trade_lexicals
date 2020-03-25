import { check } from 'express-validator/check';
import { mobileBrands } from '../../constants';

export const mobile = [
  check('brand')
    .isString()
    .withMessage('brand query-string is required')
    .isIn(mobileBrands)
    .withMessage(`brand should be one of: ${mobileBrands}`)
];
