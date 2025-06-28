import { Model, DataTypes, Sequelize } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'User',
      }
    );
  }
}

export default User;
