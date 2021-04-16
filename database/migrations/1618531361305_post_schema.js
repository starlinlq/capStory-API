"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PostSchema extends Schema {
  up() {
    this.create("posts", (table) => {
      table.increments();
      table.string("author", 100).notNullable();
      table.string("title", 100).notNullable();
      table.string("topic", 100).notNullable();
      table.string("photourl", 255).notNullable();
      table.text("story", "longtext").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("posts");
  }
}

module.exports = PostSchema;
