const Sq = require("sequelize");
const sequelize = require("../../dbconfig");
const AccessPermission = sequelize.define(
  "access_permissions",
  {
    id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
    roles: Sq.STRING,
    screen: Sq.STRING,
    create: Sq.STRING,
    read: Sq.STRING,
     edit: Sq.STRING,
    delete: Sq.STRING,
    data_access :  Sq.STRING,
    created_date: Sq.DATE,
    created_by_id: Sq.INTEGER,
    last_modified_date: Sq.DATE,
     last_modified_by_id: Sq.INTEGER,
  },
  {
    freezeTableName: true,
    schema: "common",
    createdAt: "created_date",
    updatedAt: "last_modified_date"
  }
);
module.exports = AccessPermission;