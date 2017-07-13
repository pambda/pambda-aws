# pambda-aws

Pambda for using AWS services.

## Installation

```
npm i pambda-aws -S
```

## Usage

``` javascript
import { compose, createLambda } from 'pambda';
import { aws } from 'pambda-aws';

export const handler = createLambda(
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

## License

MIT
