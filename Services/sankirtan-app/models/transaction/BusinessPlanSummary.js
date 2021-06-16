const Group = require('../common/Group');
const People = require('../common/People');
const GoalDescription= require('../transaction/GoalDescription');
const Sq = require('sequelize');
const sequelize = require('../../dbconfig');
const  Period = require('../common/Period');
const BusinessPlanSummary = sequelize.define(
	'business_plan_summary',
	{
		id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
		year: Sq.NUMBER,
		group_id: Sq.INTEGER,
		period_id: Sq.INTEGER,
		distributor_id: Sq.INTEGER,
		book_points_goal_roll_up: Sq.INTEGER,
		bbt_amount_goal_roll_up: Sq.DOUBLE,
		group_amount_goal_roll_up: Sq.DOUBLE,

		actual_book_points_roll_up: Sq.INTEGER,
		actual_bbt_amount_roll_up: Sq.DOUBLE,
		actual_group_amount_roll_up: Sq.DOUBLE,

		book_points_goal: Sq.INTEGER,
		bbt_amount_goal: Sq.DOUBLE,
		group_amount_goal: Sq.DOUBLE,

		actual_book_points: Sq.INTEGER,
		actual_bbt_amount: Sq.DOUBLE,
		actual_group_amount: Sq.DOUBLE,

		book_points_goal_total: Sq.INTEGER,
		bbt_amount_goal_total: Sq.DOUBLE,
		group_amount_goal_total: Sq.DOUBLE,

		actual_book_points_total: Sq.INTEGER,
		actual_bbt_amount_total: Sq.DOUBLE,
		actual_group_amount_total: Sq.DOUBLE,
        actual_book_points_book_type_total: Sq.STRING,
		actual_arabic_book_points_book_type_total: Sq.STRING,
		actual_team_book_points_book_type_total: Sq.ARRAY(Sq.STRING),
		organization_id: Sq.INTEGER,
		created_by_id: Sq.INTEGER,
		period_id: Sq.INTEGER,
		last_modified_by_id: Sq.INTEGER,
	},
	{
		freezeTableName: true,
		schema: 'transaction',
		createdAt: 'created_date',
		updatedAt: 'last_modified_date',
	}
);
BusinessPlanSummary.belongsTo(Group, {
	foreignKey: 'group_id',
});
BusinessPlanSummary.belongsTo(Period, {
	foreignKey: 'period_id',
});
BusinessPlanSummary.belongsTo(People, {
    as: 'createdBy',
    foreignKey: 'created_by_id'
});
BusinessPlanSummary.belongsTo(People, {
    as: 'modifiedBy',
    foreignKey: 'last_modified_by_id'
});
BusinessPlanSummary.belongsTo(People, {
    as: 'distributorPeople',
    foreignKey: 'distributor_id'
});
module.exports = BusinessPlanSummary;
