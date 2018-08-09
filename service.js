module.exports.serve = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: JSON.parse(event.body),
    }),
  };

  console.log(JSON.parse(event.body));

  callback(null, response);
};
