import WinstonCloudwatch from 'winston-cloudwatch';

const { createLogger, format, transports } = require('winston');

/**
 * WARNING: To be invoked only once in service.js app entry point.
 *
 * Configures Winston logger with custom pretty printed formats and log levels:
 * {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7
   }
   after invoking this function, the global winston logger will be
   modified with these configs.

   * @return {Object} The modified winston logger object
 */
const configureGlobalWinstonLogger = () => {
  const customLogger = createLogger({
    format: format.combine(
      format.label({ label: '[Serve]' }),
      format.timestamp({ format: 'YYYY-MM-DD HH:ss:mm' }),
      format.splat(),
      format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`),
    ),
    transports: [
      new transports.Console({
        level: 'debug',
        eol: '\n',
        handleExceptions: true,
        colorize: true,
      }),
    ],
  });

  customLogger.add(new WinstonCloudwatch({
    logGroupName: 'GroupeeBot_LogGroup',
    logStreamName: 'GroupeeBot_LogStream',
  }));

  // Set the global logger so that we do not need to keep importing this func
  // to use our custom logger
  global.logger = customLogger;

  return customLogger;
};

configureGlobalWinstonLogger();
