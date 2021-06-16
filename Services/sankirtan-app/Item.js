const Sq = require("sequelize");
const sequelize = require("../../dbconfig");
const Item = sequelize.define(
  "item",
  {
    id: { type: Sq.INTEGER, autoIncrement: true, primaryKey: true },
    name: Sq.STRING,
    description: Sq.TEXT,
    book_type: Sq.STRING,
    author: Sq.STRING,
    format: Sq.STRING,
    edition: Sq.STRING,
    isbn: Sq.INTEGER,
    url: Sq.STRING,
    language: Sq.STRING,
    bbt_book_points: Sq.INTEGER,
    media_type: Sq.STRING,
    item_type: { type: Sq.STRING, defaultValue: "Book" },
    cover: Sq.STRING,
    created_by_id: Sq.INTEGER,
    last_modified_by_id: Sq.INTEGER,
    status : Sq.INTEGER,
    bbt_book_code : Sq.STRING
  },
  {
    freezeTableName: true,
    schema: "common",
    createdAt: "created_date",
    updatedAt: "last_modified_date"
  }
);
module.exports = Item;
