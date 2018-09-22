import isEmpty from 'lodash/fp/isEmpty';
import { TelegramClient } from 'messaging-api-telegram';

// Setup logs
require('./src/configs/logConfig');

module.exports.serve = async (event, context, callback) => {
  const client = TelegramClient.connect(process.env.TELEGRAM_TOKEN);

  if (!isEmpty(event.body)) {
    const data = JSON.parse(event.body);
    logger.debug(`[Data] ${JSON.stringify(data)}`);

    if (!isEmpty(data.message)) {
      const messageObj = data.message;
      const { text, photo, chat } = messageObj;

      if (typeof messageObj !== 'undefined') {
        if (text) {
          logger.debug(`[Sent] ${text}`);
          client.sendMessage(chat.id, JSON.stringify(text)).then(() => {
            logger.debug(`[Sent] ${text}`);
            callback(null, { statusCode: 200 });
          });
        } else if (photo) {
          callback(null, { statusCode: 200 });
          client.sendMessage(chat.id, 'Received your photo!').then(() => {
            logger.debug(`[Sent] ${text}`);
            callback(null, { statusCode: 200 });
          });
          // client.sendMessage(chat.id, JSON.stringify(OCRResultObj)).then(() => {
          //   callback(null, { statusCode: 200 });
          // });
        }
      }
    }
  }

  callback(null, { statusCode: 200 });
};
