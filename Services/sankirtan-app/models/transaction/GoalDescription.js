
const Sq = require("sequelize");
const sequelize = require("../../dbconfig");
const GoalDescription = sequelize.define(
  "goal_description",
  {
    id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
    group_id: Sq.INTEGER,
    period_id: Sq.INTEGER,
     period_goal_description: Sq.STRING,
    year: Sq.INTEGER,
    year_goal_description: Sq.STRING,
  },
  {
    freezeTableName: true,
    schema: "transaction",
    timestamps: false,
  }
);
module.exports = GoalDescription;