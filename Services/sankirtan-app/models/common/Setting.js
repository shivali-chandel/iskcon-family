const Item = require("../common/Item");
const Sq = require("sequelize");
const sequelize = require("../../dbconfig");
const Setting = sequelize.define(
  "settings",
  {
    id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
    key: Sq.STRING,
    value: Sq.STRING,
  },
  {
    freezeTableName: true,
    schema: "common",
    timestamps: false,
  }
);
module.exports = Setting;
