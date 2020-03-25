const allowedDeviceTypes = ['mobile', 'computer', 'tablet', 'wearable'];
export default async (req, res, next) => {
  const {
    params: { deviceType },
  } = req;
  if (!deviceType || !allowedDeviceTypes.includes(deviceType)) {
    return res.status(422).json({
      errors: [`Invalid device Type provided. Supported types: ${allowedDeviceTypes.toString()}`]
    });
  }
  return next();
};
