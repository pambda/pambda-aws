const { compose, createLambda } = require('pambda');
const { aws } = require('pambda-aws');

exports.handler = createLambda(
  compose(
    aws({
      serviceConfigs: {
        ses: {
          region: 'us-west-2',
        },
      },
    }),

    next => (event, context, callback) => {
      context.SES.listIdentities({}, callback);
    }
  )
);
