let logger = require('winston');

const { createLogger, format, transports } = logger;

logger = createLogger({
  format: format.combine(
    format.label({ label: '[Serve]' }),
    format.timestamp({ format: 'YYYY-MM-DD HH:ss:mm' }),
    format.splat(),
    format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`),
  ),
  transports: [
    new transports.Console({
      level: 'error',
      eol: '\n',
      handleExceptions: true,
      colorize: true,
    }),
  ],
});

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
