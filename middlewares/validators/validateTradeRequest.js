import { check } from 'express-validator/check';
import * as constants from '../../constants';
import { validateName } from '.';
import validateId from './validateId';
import { Mobile, Tablet, Laptop, Wearable } from '../../models/buyRequests';

const devices = [Mobile, Tablet, Laptop, Wearable];

export const validateTRUpdate = [
  ...validateId,
  check('name')
    .isString()
    .optional()
    .withMessage('Device name should be a string')
    .custom(validateName(devices))
    .withMessage('Invalid device name, kindly crosscheck'),

  check('grade')
    .isString()
    .optional()
    .withMessage('Device grade and should be a string')
    .isIn(constants.ezeProGrades)
    .withMessage(`Grade should be one of: ${constants.ezeProGrades}`),

  check('brand')
    .isString()
    .optional()
    .withMessage('Device brand should be a string')
    .isIn(constants.mobileBrands)
    .withMessage(`Brand should be one of: ${constants.mobileBrands}`)
    .custom((brand, { req: { body } }) =>
      ['samsung', 'iphone'].includes(brand) ? !body.network : true
    )
    .withMessage('iPhone and Samsung brands cannot have network property')
    .custom((brand, { req: { body } }) =>
      brand === 'ipad' ? !body.carrier : true
    )
    .withMessage('iPad brand cannot have carrier property'),

  check('storageSize')
    .isString()
    .optional()
    .withMessage('Size should be a string')
    .isIn(constants.mobileSizes)
    .withMessage(`Size should be one of: ${constants.mobileSizes}`),

  check('category')
    .isIn(constants.deviceTypes)
    .optional()
    .withMessage(`Category should be one of: ${constants.deviceTypes}`),

  check('carrier')
    .isString()
    .optional()
    .withMessage('Device carrier should be a string')
    .custom((carrier, { req: { body } }) => !body.network)
    .withMessage('Device cannot have both carrier and network')
    .isIn(constants.carriers)
    .withMessage(`Carrier should be one of: ${constants.carriers}`),

  check('network')
    .isString()
    .optional()
    .withMessage('Device network should be a string')
    .isIn(constants.networks)
    .withMessage(`Network should be one of: ${constants.networks}`),

  check('quantity')
    .isNumeric()
    .optional()
    .withMessage('quantity should be number field'),

  check('price')
    .isNumeric()
    .optional()
    .withMessage('price should be number field')
];
export default [
  check('name')
    .isString()
    .withMessage('Device name is required and should be a string')
    .custom(validateName(devices))
    .withMessage('Invalid mobile device name, kindly crosscheck'),

  check('grade')
    .isString()
    .withMessage('Device grade is required and should be a string')
    .isIn(constants.ezeProGrades)
    .withMessage(`Grade should be one of: ${constants.ezeProGrades}`),

  check('brand')
    .isString()
    .withMessage('Device brand is required')
    .isIn(constants.mobileBrands)
    .withMessage(`Brand should be one of: ${constants.mobileBrands}`)
    .custom((brand, { req: { body } }) =>
      ['samsung', 'iphone'].includes(brand) ? !body.network : true
    )
    .withMessage('iPhone and Samsung brands cannot have network property')
    .custom((brand, { req: { body } }) =>
      brand === 'ipad' ? !body.carrier : true
    )
    .withMessage('iPad brand cannot have carrier property'),

  check('storageSize')
    .isString()
    .withMessage('Size should be a string')
    .isIn(constants.mobileSizes)
    .withMessage(`Size should be one of: ${constants.mobileSizes}`),

  check('category')
    .isIn(constants.deviceTypes)
    .optional()
    .withMessage(`Category should be one of: ${constants.deviceTypes}`),

  check('carrier')
    .isString()
    .optional()
    .withMessage('Device carrier should be a string')
    .custom((carrier, { req: { body } }) => !body.network)
    .withMessage('Device cannot have both carrier and network')
    .isIn(constants.carriers)
    .withMessage(`Carrier should be one of: ${constants.carriers}`),

  check('network')
    .isString()
    .optional()
    .withMessage('Device network should be a string')
    .isIn(constants.networks)
    .withMessage(`Network should be one of: ${constants.networks}`),

  check('quantity')
    .isNumeric()
    .withMessage('quantity is a required number field'),

  check('price')
    .isNumeric()
    .withMessage('price is a required number field')
];
