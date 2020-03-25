import { check } from 'express-validator/check';
import { isEmail } from 'validator';
import * as constants from '../../constants';
import { validateName } from '.';
import { Mobile } from '../../models/buyRequests';

export const validateCheckout = [
  check('cart')
    .isArray()
    .withMessage('cart field should be an array of cart items'),
  check('paymentMethod')
    .isString()
    .withMessage('paymentMethod should be a string')
    .isIn(['paypal', 'check'])
    .withMessage('paymentMethod should be either paypal or check'),
  check('saleType')
    .isString()
    .optional()
    .withMessage('saleType should be a string')
    .isIn(['bulk', 'default'])
    .withMessage('saleType should be either bulk or default'),
  check('paymentEmail')
    .custom((paypalEmail, { req: { body } }) =>
      (body.paymentMethod === "paypal" ? isEmail(paypalEmail) : true))
    .withMessage('Please enter a valid paymentEmail'),
  check('sellerAddress')
    .isMongoId()
    .withMessage('sellerAddress is a required addressId'),
  check('cart.*._id')
    .optional()
    .isMongoId()
    .withMessage('Cart item ID is invalid or missing'),
  check('cart.*.name')
    .isString()
    .withMessage('Device name is required and should be a string')
    .custom(validateName([Mobile]))
    .withMessage('Invalid mobile device name, kindly crosscheck'),
  check('cart.*.grade')
    .isString()
    .withMessage('Device grade is required and should be a string')
    .isIn(constants.grades)
    .withMessage(`Grade should be one of: ${constants.grades}`),
  check('cart.*.brand')
    .isString()
    .optional()
    .withMessage('Device brand is required')
    .isIn(constants.mobileBrands)
    .withMessage(`Brand should be one of: ${constants.mobileBrands}`)
    .custom((brand, { req: { body } }) =>
      (["samsung", "iphone"].includes(brand) ? !body.network : true))
    .withMessage('iPhone and Samsung brands cannot have network property')
    .custom((brand, { req: { body } }) =>
      (brand === "ipad" ? !body.carrier : true))
    .withMessage('iPad brand cannot have carrier property'),
  check('cart.*.storageSize')
    .isString()
    .withMessage('Size should be a string')
    .isIn(constants.mobileSizes)
    .withMessage(`Size should be one of: ${constants.mobileSizes}`),
  check('cart.*.category')
    .isIn(constants.deviceTypes)
    .optional()
    .withMessage(`Category should be one of: ${constants.deviceTypes}`),
  check('cart.*.carrier')
    .isString()
    .optional()
    .withMessage('Device carrier should be a string')
    .custom((carrier, { req: { body } }) => !body.network)
    .withMessage('Device cannot have both carrier and network')
    .isIn(constants.carriers)
    .withMessage(`Carrier should be one of: ${constants.carriers}`),
  check('cart.*.network')
    .isString()
    .optional()
    .withMessage('Device network should be a string')
    .isIn(constants.networks)
    .withMessage(`Network should be one of: ${constants.networks}`),
  check('cart.*.issues')
    .isArray()
    .optional()
    .withMessage('Issues should be an array')
    .custom(issues =>
      issues.every(item => constants.mobileIssues.includes(item)))
    .withMessage(`Issues should be one of: ${constants.mobileIssues}`),
  check('cart.*.quantity')
    .isNumeric()
    .optional()
    .withMessage('Quantity should be a number')
    .custom(value => value > 0)
    .withMessage('Quantity must be greater than zero'),
  check('cart.*.imeiNumbers')
    .isArray()
    .optional()
    .withMessage('imeiNumbers should be an array')
    .custom(imeiNos => imeiNos.every(item => typeof +item === 'number'))
    .withMessage('IMEI numbers should contain only numbers')
];
