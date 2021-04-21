"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PostLike extends Model {
  post() {
    return this.belongsTo("App/Models/Post");
  }
}

module.exports = PostLike;
