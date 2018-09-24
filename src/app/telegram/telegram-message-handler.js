import { TelegramClient } from 'messaging-api-telegram';

const client = TelegramClient.connect(process.env.TELEGRAM_TOKEN);

/**
 * Handles incoming Telegram message objects.
 */
const handleMessage = (msgObj) => {
  const { text, photo, chat } = msgObj;
  if (text) {
    readText(chat, text);
  } else if (photo) {
    readPhoto(chat, photo);
  } else {
    logger.error(`Unsupported telegram message. We currently only support
      text & photos, however, this was given: ${msgObj}.`);
  }
};

/**
 * Handles text messages from Telegram
 *
 * @param {Object} chat The chat object representing some user
 * information about the sender of this msgobj. Example:
 * {
      "id": 100033363,
      "first_name": "Natasha",
      "last_name": "Koh",
      "username": "NatashaKoh",
      "type": "private"
    }
 * @param {String} text Text content of the message
 */
const readText = (chat, text) => {
  client.sendMessage(chat.id, text).then(() => {
    logger.debug(`Received text: ${text}`);
  });
};

/**
 * Handles a photo sent from Telegram.
 * Each object in the input photos array is the same image with a different
 * resolution.
 *
 * Example:
 * [{
      "file_id": "AgADBQADP6gxG8Q5eVd6h3FI242HJ0Ch1jIABPwX6RhqH6Ea8zcBAAEC",
      "file_size": 27884,
      "width": 800,
      "height": 800
    },
    {
      "file_id": "AgADBQADP6gxG8Q5eVd6h3FI242HJ0Ch1jIABLC_oQVfDB2q8DcBAAEC",
      "file_size": 39342,
      "width": 995,
      "height": 995
    }]
 *
 * @param {Array} photo Array of objects representing an photo.
 */
const readPhoto = (chat, photos) => {
  client.sendMessage(chat.id, 'Received your photo!').then(() => {
    logger.debug('Received photo confirmation');
  });
};

export default handleMessage;
