/* eslint-disable func-names */
/* eslint-disable require-jsdoc */
import { client } from '../app';
import config from '../config';
import { response } from './http';

const { ELASTIC_INDEX } = config;

class ModelHooks {
  requestObj = id => ({
    index: ELASTIC_INDEX,
    type: 'device',
    id: `${id}`
  });
  save(_doc) {
    const { _id: id, ...searchFields } = _doc;
    client.index({
      ...this.requestObj(id),
      body: searchFields
    });
  }
  update(_doc) {
    const { _id: id, ...searchFields } = _doc;
    client.update({
      ...this.requestObj(id),
      body: { doc: searchFields }
    });
  }
  async customRemove(_id, model) {
    const result = await model.findOneAndRemove({ _id });
    client.delete(this.requestObj(_id));
    return result;
  }
}
export const modelHooks = new ModelHooks();

/**
 * @desc Generates a mongoose schema object from an array of keys
 *
 * @param {Array} objectKeys List of fields from which to generate schema
 * @param {any} constraint Constraint to be applied to each field
 * @returns {Object} Schema object
 */
export const gradeSchema = (objectKeys, constraint) =>
  objectKeys.reduce((object, current) => {
    object[current] = { price: constraint, quantity: constraint };
    return object;
  }, {});

/**
 * @desc Generates a mongoose schema object from an array of keys
 *
 * @param {Array} objectKeys List of issues from which to generate deduction schema
 * @param {any} constraint Constraint to be applied to each field
 * @returns {Object} Schema object
 */
export const deductionSchema = (objectKeys, constraint) =>
  objectKeys.reduce((object, current) => {
    object[current] = constraint;
    return object;
  }, {});

export const findAndCountTotal = async (Model, query, page, limit) => {
  const result = await Model.aggregate([
    {
      $match: query
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $facet: {
        total: [{ $count: 'count' }],
        data: [{ $skip: (page - 1) * limit }, { $limit: +limit }]
      }
    }
  ]);
  return result[0];
};

// create query-builder from queryString entered in request to handle conditions
// like from a date to another date, where name is value, by grade, etc
export const getDocuments = async (req, res, Model, queries, transformer) => {
  const {
    query: { limit = 10, page = 1 }
  } = req;
  const { data, total } = await findAndCountTotal(Model, queries, page, limit);
  return response({
    res,
    code: 200,
    message: `Successfully fetched list of ${Model.collection.collectionName}`,
    data: {
      total: total[0] ? total[0].count : 0,
      data: transformer(data)
    }
  });
};
