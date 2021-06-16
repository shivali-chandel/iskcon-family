const Sq = require("sequelize");
const sequelize = require("../../dbconfig");
const Period = sequelize.define(
  "period",
  {
    id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
    name: Sq.STRING,
    year: Sq.NUMBER,
    number: { type: Sq.NUMBER, defaultValue: 1 },
    status: { type: Sq.STRING, defaultValue: "Open" },
    type: Sq.STRING,
    start: Sq.DATE,
    end: Sq.DATE,
    created_by_id: Sq.INTEGER,
    last_modified_by_id: Sq.INTEGER,
    is_active: Sq.INTEGER
  },
  {
    freezeTableName: true,
    schema: "common",
    createdAt: "created_date",
    updatedAt: "last_modified_date"
  }
);
module.exports = Period;
