"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TopicSchema extends Schema {
  up() {
    this.create("topics", (table) => {
      table.string("nature", 100).notNullable().unique();
      table.string("universe", 100).notNullable().unique();
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop("topics");
  }
}

module.exports = TopicSchema;
