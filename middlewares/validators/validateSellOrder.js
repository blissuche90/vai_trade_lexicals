import { check } from 'express-validator/check';
import * as constants from '../../constants';
import { validateName } from '.';
import { Mobile } from '../../models/buyRequests';

export const validateSellOrder = [
  check('name')
    .isString()
    .optional()
    .withMessage('Device name is required and should be a string')
    .custom(validateName([Mobile]))
    .withMessage('Invalid mobile device name, kindly crosscheck'),

  check('grade')
    .isString()
    .optional()
    .withMessage('Device grade is required and should be a string')
    .isIn(constants.grades)
    .withMessage(`Grade should be one of: ${constants.grades}`),

  check('brand')
    .isString()
    .optional()
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

  check('issues')
    .isArray()
    .optional()
    .withMessage('Issues should be an array')
    .custom(issues =>
      issues.every(item => constants.mobileIssues.includes(item))
    )
    .withMessage(`Issues should be one of: ${constants.mobileIssues}`)
];
