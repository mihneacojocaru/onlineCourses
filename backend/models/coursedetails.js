import { Sequelize } from "sequelize";

export default (sequelize) => {
  class CourseDetails extends Sequelize.Model {}

  CourseDetails.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      professor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      estimated_time: {
        type: Sequelize.STRING,
      },
      materials_needed: {
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      createdAt: false,
      updatedAt: false,
      tableName: "CourseDetails",
    }
  );

  return CourseDetails;
};
