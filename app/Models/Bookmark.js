"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Bookmark extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
  /*   post() {
    return this.hasOne("App/Models/Post");
  } */
}

module.exports = Bookmark;
