import isEmpty from 'lodash/fp/isEmpty';
import handleMessage from './src/app/telegram/telegram-message-handler';

// Setup logs
require('./src/config/logConfig');

module.exports.serve = async (event, context, callback) => {
  if (!isEmpty(event.body)) {
    const data = JSON.parse(event.body);

    logger.debug(`[Data] ${JSON.stringify(data)}`);

    if (!isEmpty(data.message)) {
      handleMessage(data.message);
    }
  }
  callback(null, { statusCode: 200 });
};
