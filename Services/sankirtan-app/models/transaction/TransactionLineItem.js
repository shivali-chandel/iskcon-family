const Item = require("../common/Item");
const Sq = require("sequelize");
const sequelize = require("../../dbconfig");
const TransactionLineItem = sequelize.define(
  "transaction_line_item",
  {
    id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
    transaction_id: Sq.INTEGER,
    item_id: Sq.INTEGER,
    quantity: Sq.INTEGER,
    price: Sq.STRING,
    net_amount: Sq.STRING,
    organization_id: Sq.INTEGER,
    unit_of_measure: Sq.STRING,
    transaction_book_points: Sq.INTEGER,
  },
  {
    freezeTableName: true,
    schema: "transaction",
    timestamps: false,
  }
);
TransactionLineItem.belongsTo(Item, {
  foreignKey: "item_id",
});
module.exports = TransactionLineItem;
