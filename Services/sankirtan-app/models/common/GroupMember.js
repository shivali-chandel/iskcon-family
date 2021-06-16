const People = require("./People");
const Sq = require("sequelize");
const sequelize = require("../../dbconfig");
const GroupMember = sequelize.define(
  "group_members",
  {
    id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
    group: Sq.INTEGER,
    people: Sq.INTEGER,
    position: { type: Sq.STRING, defaultValue: "Member" },
    organization_id: Sq.INTEGER,
    external_id_people: Sq.STRING,
    external_id_group: Sq.STRING,
  },
  {
    freezeTableName: true,
    schema: "common",
    timestamps: false,
  }
);
GroupMember.belongsTo(People, {
  foreignKey: "people",
});
module.exports = GroupMember;
