const TransactionLineItem = require('./TransactionLineItem');
const TransactionPeople = require('./TransactionPeople');
const Group = require('../common/Group');
const Sq = require('sequelize');
const sequelize = require('../../dbconfig');
const Transaction = sequelize.define(
	'transaction',
	{
		id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
		date: Sq.DATE,
		currency_id: Sq.INTEGER,
		people_email: Sq.STRING,
		people_first_name: Sq.STRING,
		people_last_name: Sq.STRING,
		people_mobile: Sq.STRING,
		people_gender: Sq.STRING,
		people_group_ids: Sq.STRING,
		people_add_to_group: Sq.STRING,
		transaction_group_id: Sq.INTEGER,
		// distributor_ids: Sq.STRING,
		location_name: Sq.STRING,
		location_city: Sq.STRING,
		location_address: Sq.STRING,
		location_address2: Sq.STRING,
		location_state: Sq.STRING,
		location_zip: Sq.STRING,
		location_country: Sq.STRING,
		location_address_type: Sq.STRING,
		location_community_type: Sq.STRING,
		location_coverage: Sq.STRING,
		transaction_amount: Sq.DOUBLE,
		transaction_book_points: Sq.INTEGER,
		'completed_summary_roll-ups': { type: Sq.BOOLEAN, defaultValue: false },
		transaction_action: { type: Sq.STRING, defaultValue: 'Add' }, //Add, Update, Cancel
		previous_transaction_id: Sq.INTEGER,
		next_transaction_id: Sq.INTEGER,
		organization_id: Sq.INTEGER,
		comments: Sq.TEXT,
		gnab: Sq.TEXT,
		photos: Sq.TEXT,
		transasction_status: Sq.STRING, //Active, Cancelled, Draft
		created_by_id: Sq.INTEGER,
		last_modified_by_id: Sq.INTEGER,
		total_amount: Sq.INTEGER,
		batch_id:Sq.INTEGER,
		distribution_type : Sq.STRING,
		is_contact_photo : Sq.BOOLEAN,
		other_distributors : Sq.STRING,
		photos2 : Sq.ARRAY(Sq.STRING)
	},
	{
		freezeTableName: true,
		schema: 'transaction',
		createdAt: 'created_date',
		updatedAt: 'last_modified_date',
	}
);
Transaction.hasMany(TransactionLineItem, {
	foreignKey: 'transaction_id',
});
Transaction.hasMany(TransactionPeople, {
	foreignKey: 'transaction_id',
});
Transaction.belongsTo(Group, {
	foreignKey: 'transaction_group_id',
});
module.exports = Transaction;
