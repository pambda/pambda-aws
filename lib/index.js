const { addAwsServices } = require('lazy-aws-service');
const { callbackify } = require('lambda-callbackify');

const aws = (options = {}) => {
  let AWS = require('aws-sdk');

  const {
    awsConfig,
    serviceConfigs,
    xray,
  } = options;

  if (xray && process.env.AWS_XRAY_DAEMON_ADDRESS) {
    let AWSXRay;

    try {
      AWSXRay = require('aws-xray-sdk');
    } catch (e) {
      const msg = 'Package aws-xray-sdk not found';
      console.error('Error: ' + msg);
      throw new Error(msg);
    }

    AWS = AWSXRay.captureAWS(AWS);
  }

  if (awsConfig) {
    AWS.config.update(awsConfig);
  }

  if (serviceConfigs) {
    Object.assign(AWS.config, serviceConfigs);
  }

  return next => {
    next = callbackify(next);

    return (event, context, callback) => {
      addAwsServices(context, AWS);

      next(event, context, callback);
    };
  }
};

/*
 * Exports.
 */
exports.aws = aws;
