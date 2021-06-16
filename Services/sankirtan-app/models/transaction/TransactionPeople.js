const People = require("../common/People");
const Sq = require("sequelize");
const sequelize = require("../../dbconfig");
const TransactionPeople = sequelize.define(
  "transaction_people",
  {
    id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
    transaction_id: Sq.INTEGER,
    distributor_id: Sq.INTEGER,
    other_distributor_id: Sq.INTEGER,
    distributor_index: Sq.INTEGER,
    },
  {
    freezeTableName: true,
    schema: "transaction",
    timestamps: false,
  }
);
TransactionPeople.belongsTo(People, {
  foreignKey: "distributor_id",
});
module.exports = TransactionPeople;
