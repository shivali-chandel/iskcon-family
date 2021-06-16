const Transaction = require('./Transaction');
const Sq = require('sequelize');
const sequelize = require('../../dbconfig');
const UploadBatch = sequelize.define(
	'upload_batch',
	{
		batch_id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
		start_time:Sq.DATE,
		end_time:Sq.DATE,
		total_records:Sq.INTEGER,
		success_records:Sq.INTEGER,
		failed_records:Sq.INTEGER,
		batch_date: Sq.DATE,
		user_info:Sq.STRING,
		input_filename:Sq.STRING,
		output_filename:Sq.STRING,
		status:Sq.STRING,
		errormsg:Sq.STRING
	},
	{
		freezeTableName: true,
		schema: 'transaction',
		timestamps: false,
	}
);
UploadBatch.hasMany(Transaction, {
	foreignKey: 'batch_id',
});

module.exports = UploadBatch;
