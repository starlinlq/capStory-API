"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Post extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
  comment() {
    return this.hasMany("App/Models/Comment");
  }
  /*   bookmark() {
    return this.belongsToMany("App/models/Bookmark");
  } */
  topic() {
    return this.hasOne("App/Models/Topic");
  }
  like() {
    return this.hasMany("App/Models/PostLike");
  }
}

module.exports = Post;
