module.exports.listen = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello there, I am a lambda function!',
      input: event,
    }),
  };

  console.log('Hello lambda function speaking from console logs!');

  callback(null, response);
};
