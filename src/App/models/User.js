import { Model, DataTypes, Sequelize } from "sequelize";
import  bcrypt from "bcrypt";

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
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'User',
      }
    );

    this.addHook("beforeSave", async (user) => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 10);
        
      }
    })
    return this;
  }
}

export default User;
