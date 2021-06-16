const GroupMember = require('./GroupMember');
const Sq = require('sequelize');
const sequelize = require('../../dbconfig');
const Group = sequelize.define(
	'group',
	{
		id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
		name: Sq.STRING,
		status: { type: Sq.NUMBER, defaultValue: 'Active' },
		meeting_address: Sq.STRING,
		meeting_city: Sq.STRING,
		meeting_state: Sq.STRING,
		meeting_postcode: Sq.STRING,
		meeting_country: Sq.STRING,
		categories: Sq.STRING,
		departments: Sq.STRING,
		demographics: Sq.STRING,
		locations: Sq.STRING,
		continent: { type: Sq.STRING, defaultValue: 'Asia' },
		book_distribution_reporting_level: {
			type: Sq.STRING,
			defaultValue: 'Individual',
		},
		group_type: { type: Sq.STRING, defaultValue: 'Temple' },
		parent_group: Sq.INTEGER,
		whatsapp_group: Sq.STRING,
		parent_groups_hierarchy: Sq.STRING,
		favorite_books: Sq.STRING,
		reports_score_to_sankirtan_newsletter: Sq.STRING,
		sankirtan_group_type: { type: Sq.STRING, defaultValue: 'Corporate' },
		sankirtan_group_continent: Sq.STRING,
		sankirtan_group_country: Sq.STRING,
		picture_url: Sq.STRING,
		organization_id: Sq.NUMBER,
		external_id: Sq.STRING,
		deleted_in_crm: Sq.BOOLEAN,
		created_by_id: Sq.INTEGER,
		last_modified_by_id: Sq.INTEGER,
		child_groups_hierarchy : Sq.STRING,
		amount_entry_as_totals_only: Sq.BOOLEAN
	},
	{
		freezeTableName: true,
		schema: 'common',
		createdAt: 'created_date',
		updatedAt: 'last_modified_date',
	}
);
Group.hasMany(GroupMember, {
	foreignKey: 'group',
});
module.exports = Group;
