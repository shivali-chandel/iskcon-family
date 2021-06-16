const Sq = require("sequelize");
const sequelize = require("../../dbconfig");
const Organization = sequelize.define(
  "organization",
  {
    id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
    name: Sq.STRING,
    source_website_url_primary: Sq.STRING,
    target_elvanto_url_primary: Sq.STRING,
    elvanto_api_key: Sq.STRING,
    google_maps_api_key: Sq.STRING,
    new_people_default_groups: {
      type: Sq.STRING,
      defaultValue: "Default Group"
    },
    new_people_default_type: { type: Sq.STRING, defaultValue: "Default Type" },
    created_by_id: Sq.INTEGER,
    last_modified_by_id: Sq.INTEGER,
    category_lead_id : Sq.STRING,
    distribution_list_email : Sq.STRING,
    email_book_distribution_entry : Sq.BOOLEAN,
  },
  {
    freezeTableName: true,
    schema: "common",
    createdAt: "created_date",
    updatedAt: "last_modified_date"
  }
);
module.exports = Organization;
