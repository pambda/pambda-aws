const { addAwsServices } = require('lazy-aws-service');

const aws = (options = {}) => {
  const AWS = require('aws-sdk');

  const {
    awsConfig,
    serviceConfigs,
  } = options;

  if (awsConfig) {
    AWS.config.update(awsConfig);
  }

  if (serviceConfigs) {
    Object.assign(AWS.config, serviceConfigs);
  }

  return next => (event, context, callback) => {
    addAwsServices(context, AWS);

    next(event, context, callback);
  };
};

exports.aws = aws;
