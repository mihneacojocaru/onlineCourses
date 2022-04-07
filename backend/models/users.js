"use strict";
import bcrypt from "bcryptjs";
import { Sequelize } from "sequelize";

export default (sequelize) => {
  class Users extends Sequelize.Model {}
  Users.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username can not be null!",
          },
          notEmpty: {
            msg: "Username can not be empty!",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email can not be null!",
          },
          notEmpty: {
            msg: "Email can not be empty!",
          },
        },
      },
      password: {
        type: Sequelize.VIRTUAL,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password can not be null!",
          },
          notEmpty: {
            msg: "Password can not be empty!",
          },
        },
      },

      confirmedPassword: {
        type: Sequelize.STRING,
        allowNull: false,
        set(val){
          if(val===this.password){
            const hashedPassword=bcrypt.hashSync(val,10);
            this.setDataValue('confirmedPassword',hashedPassword);
          }
        },
        validate: {
          notNull: {
            msg: "Both passwords must match",
          },
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      updatedAt: false,
      tableName: "Users",
    }
  );
  return Users;
};
