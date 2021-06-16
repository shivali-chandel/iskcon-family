const Sq = require('sequelize');
const sequelize = require('../../dbconfig');
const Group_1 = sequelize.define(
	'groups_1',
	{
		id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
		name: Sq.STRING,
		status: { type: Sq.NUMBER, defaultValue: 'Active' },
		description: Sq.STRING,
		meeting_address: Sq.STRING,
		meeting_city: Sq.STRING,
		meeting_state: Sq.STRING,
		meeting_postcode: Sq.STRING,
		meeting_country: Sq.STRING,
		meeting_day: Sq.STRING,
		meeting_time: Sq.STRING,
		meeting_frequency: Sq.STRING,
		picture: Sq.STRING,
		date_added: Sq.DATE,
		date_modified: Sq.DATE,
	},
	{
		freezeTableName: true,
		schema: 'common',
		timestamps: false,
	}
);
module.exports = Group_1;
