"use strict";
import { Sequelize } from "sequelize";

export default (sequelize) => {
  class Courses extends Sequelize.Model {}

  Courses.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      course_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "CourseName can not be null!",
          },
          notEmpty: {
            msg: "CourseName can not be empty!",
          },
        },
      },
      department: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Department can not be null!",
          },
          notEmpty: {
            msg: "Department can not be empty!",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "Courses",
    }
  );
  return Courses;
};
