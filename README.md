# pambda-aws

[Pambda](https://github.com/pambda/pambda) for using AWS services.

## Installation

```
npm i pambda-aws
```

## Usage

``` javascript
const { compose, createLambda } = require('pambda');
const { aws } = require('pambda-aws');

exports.handler = createLambda(
  compose(
    aws({
      serviceConfigs: {
        ses: { region: 'us-west-2' }
      },
    }),

    // Subsequent pambdas can obtain instances of AWS service from context.
    next => (event, context, callback) => {
      const dynamodb = context.DynamoDB;

      // This SES uses in the Oregon region.
      const ses = context.SES;
    }
  )
);
```

## aws(options = {})

Generate and return a pambda to add AWS service properties to `context`.

The pambda uses [lazy-aws-service](https://github.com/nak2k/node-lazy-aws-service) to add properties.

Since added properties are delayed initialized, instances of unused services will not be created.

### Arguments

- `options.awsConfig`
    - An object that is passed into `AWS.config.update()`.
    - If omitted, `AWS.config.update()` not called.
- `options.serviceConfigs`
    - An object to configure for each AWS services. Properties of this object set into properties of `AWS.config`.
    - This options is useful to specify a region for some services.
- `options.xray`
    - A boolean value whether decide to use [aws-xray-sdk](https://www.npmjs.com/package/aws-xray-sdk).
    - If `process.env.AWS_XRAY_DAEMON_ADDRESS` is undefined, X-Ray is not used even if this option enabled.

## License

MIT
