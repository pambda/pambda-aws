const test = require('tape');
const { compose, createLambda } = require('pambda');
const {
  aws
} = require('../');

test('test', t => {
  t.plan(4);

  const handler = createLambda(
    compose(
      aws(),

      next => (event, context, callback) => {
        const s3 = context.S3;
        const documentClient = context.DocumentClient;

        t.ok(s3);
        t.ok(documentClient);

        callback(null, true);
      }
    )
  );

  handler({}, {}, (err, result) => {
    t.error(err);
    t.ok(result);
  });
});
