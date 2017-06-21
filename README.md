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
    aws(),

    // Subsequent pambdas can obtain instances of AWS service from context.
    next => (event, context, callback) => {
      const dynamodb = context.DynamoDB;
    }
  )
);
```

## aws()

Generate and return a pambda to add AWS service properties to `context`.

The pambda uses [lazy-aws-service](https://github.com/nak2k/node-lazy-aws-service) to add properties.

Since added properties are delayed initialized, instances of unused services will not be created.

## License

MIT
