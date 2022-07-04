const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our User model
class User extends Model {}

// define table columns and configuration
User.init(
  {
    //* define an id column
    id: {
        type: DataTypes.INTEGER,
        // NOT NULL option
        allowNull: false,
        // This is the primary key
        primaryKey: true,
        autoIncrement: true,
    },
    //* define a username column
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //* define an email column
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // There cannot be any duplicate email values
        unique: true,
        // if allowNull is set to false, we can run data through validators before creating table data
        validate: {
            isEmail: true
        }
    },
    //* define a password column
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // this means the pass must be atleast 4 characters long
            len: [4]
        }
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
