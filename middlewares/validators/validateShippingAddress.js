const condition = arg => !!arg.length;

const validationCriteria = [
  {
    test: ({ addressLineOne }) => condition(addressLineOne),
    message: 'Please enter an address',
    fieldName: 'addressLineOne'
  },
  {
    test: ({ country }) => condition(country),
    message: 'Please provide a country',
    fieldName: 'country'
  },
  {
    test: ({ state }) => condition(state),
    message: 'Please provide a state',
    fieldName: 'state'
  },
  {
    test: ({ city }) => condition(city),
    message: 'Please provide a city',
    fieldName: 'city'
  },
  {
    test: ({ postalCode }) => condition(postalCode),
    message: 'Please provide a postal code',
    fieldName: 'postalCode'
  }
];

export const validateShippingAddress = (shippingAddressData) => {
  const errors = validationCriteria.reduce((messages, criterion) => {
    if (!criterion.test(shippingAddressData)) {
      messages[criterion.fieldName] = criterion.message;
    }
    return messages;
  }, {});

  return {
    isValid: Object.entries(errors).length === 0,
    errors
  };
};
