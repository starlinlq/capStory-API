"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TopicSchema extends Schema {
  up() {
    this.create("topics", (table) => {
      table.integer("post_id").unsigned().references("id").inTable("posts");
      table.string("title", 100).notNullable();
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop("topics");
  }
}

module.exports = TopicSchema;
