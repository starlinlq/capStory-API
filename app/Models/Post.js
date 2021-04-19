"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Post extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
  comments() {
    return this.hasMany("App/Models/Comment");
  }

  topic() {
    return this.hasOne("App/Models/Topic");
  }
}

module.exports = Post;
