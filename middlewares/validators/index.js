/* eslint-disable arrow-parens */
import { validationResult } from 'express-validator/check';
import { validateSellOrder } from './validateSellOrder';
import { mobile } from './validatePricelist';
import validateDeviceTypes from './validateDeviceType';
import validateDisputes from './validateDisputes';
import validateSupport from './validateSupport';
import * as validateUser from './validateUser';
import { validateCartItem } from './validateCartItem';
import { validateCheckout } from './validateCheckout';
import { validateWaitlist } from './validateWaitlist';
import { validateBuyerResolution } from './validateAdmin';
import * as validateRecoverPassword from './recoverPassword';

export {
  default as validateTradeRequest,
  validateTRUpdate
} from './validateTradeRequest';
export { default as ValidateId } from './validateId';
const getErrors = (req, next) => {
  const errors = validationResult(req)
    .array()
    .map(error => error.msg);
  if (!errors.length) {
    return next();
  }
  return errors;
};

export const handleValidation = async (req, res, next) => {
  const result = getErrors(req, next);
  return Array.isArray(result)
    ? res.status(400).json({ errors: result, status: 'error' })
    : result;
};

/**
 * @desc Validates name of record to ensure is one existing model names
 *
 * @param {Array} models List of models to use in validating resource name
 * @returns {Boolean} True or False if name is valid or invalid
 */
export function validateName(models) {
  return async name => {
    const devices = await Promise.all(
      models.map(model => model.distinct('name'))
    );
    return devices.flat().includes(name);
  };
}
export { default as ValidateOrderQuery } from './validateOrderQuery';
export { default as ValidateTradingPrice } from './validateTradingPrice';
export const { recoverPassword, resetPassword } = validateRecoverPassword;
export const ValidateSellOrder = validateSellOrder;
export const validateMobilePricelist = mobile;
export const ValidateDeviceType = validateDeviceTypes;
export const ValidateDisputes = validateDisputes;
export const ValidateSupport = validateSupport;
export const { signin, signup } = validateUser;
export const ValidateCartItem = validateCartItem;
export const ValidateCheckout = validateCheckout;
export const ValidateWaitlist = validateWaitlist;
export const ValidateBuyerResolution = validateBuyerResolution;
