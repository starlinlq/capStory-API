"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProfileSchema extends Schema {
  up() {
    this.create("profiles", (table) => {
      table.increments();
      table.string("bio", 300).notNullable();
      table.string("location", 80).notNullable();
      table.string("interest", 100).notNullable();
      table.string("photourl", 100).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("profiles");
  }
}

module.exports = ProfileSchema;