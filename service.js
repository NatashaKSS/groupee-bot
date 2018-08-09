require('./src/configs/logConfig');

module.exports.serve = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: JSON.parse(event.body),
    }),
  };

  logger.debug('winston got a debug');
  logger.error('winston got a error %o', { hello: 'world' });

  callback(null, response);
};
