import { Sequelize, DataTypes, Model} from 'sequelize';
import database from '../database';

const ChatUser = database.define('ChatUser', {
  chatId: {
    type: DataTypes.INTEGER,
    unique: "true"
  }
});

export default ChatUser;
