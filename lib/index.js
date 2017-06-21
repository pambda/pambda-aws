const { addAwsServices } = require('lazy-aws-service');

const aws = (options = {}) => {
  const AWS = require('aws-sdk');

  return next => (event, context, callback) => {
    addAwsServices(context, AWS);

    next(event, context, callback);
  };
};

exports.aws = aws;
