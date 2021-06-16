const Sq = require("sequelize");
const sequelize = require("../../dbconfig");
const RollupReports = sequelize.define(
  "transaction_rollup_reports",
  {
    rollup_id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
    start_time: Sq.DATE,
    end_time: Sq.DATE,
    updated_count:Sq.NUMBER,
    success_count:Sq.NUMBER,
    failed_count:Sq.NUMBER,
    batch_date:Sq.DATE
  },
  {
    freezeTableName: true,
    schema: "transaction",
    timestamps: false,
  }
);
module.exports = RollupReports;

