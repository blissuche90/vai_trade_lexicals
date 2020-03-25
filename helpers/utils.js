export const parseObject = (requestBody, options) =>
  Object.entries(requestBody).reduce((result, [key, value]) => {
    if (options[key] && value) {
      result[key] = value;
    }
    return result;
  }, {});
