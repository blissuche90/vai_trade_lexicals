import { check } from 'express-validator/check';

export const validateBuyerResolution = [
  check('resolution')
    .isIn(['rejected', 'approved'])
    .withMessage('proposed resolution should be either rejected or approved')
];
