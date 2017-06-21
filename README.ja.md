# pambda-aws

AWSサービスを使うためのPambda.

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

    // 後続の Pambda は context から AWS サービスのインスタンスを取得できる。
    next => (event, context, callback) => {
      const dynamodb = context.DynamoDB;
    }
  )
);
```

## aws()

`context` に AWS サービスのプロパティを追加する Pambda を生成して返す。

プロパティを追加するために [lazy-aws-service](https://github.com/nak2k/node-lazy-aws-service) を使用している。

追加されたプロパティは遅延初期化されるので、使用していないサービスのインスタンスが作られることはない。

## License

MIT
