"use strict";

const { route } = require("@adonisjs/framework/src/Route/Manager");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", "PostController.show");

//register & login
Route.group(() => {
  Route.post("signup", "UserController.signup");
  Route.post("login", "UserController.login");
}).prefix("api");

Route.group(() => {
  Route.get(":id", "PostController.single");
  Route.get(":id/comment", "CommentController.show");
}).prefix("api/post");

Route.group(() => {
  Route.get("profile/:id", "ProfileController.index");
  Route.put("profile/update", "ProfileController.update");
  Route.get("validate", "UserController.validate");
  Route.get("bookmark", "BookmarkController.show");
})
  .prefix("api/user")
  .middleware("auth:jwt");

Route.group(() => {
  Route.post("create", "PostController.create");
  Route.get("", "PostController.index");
  Route.post(":id/comment", "CommentController.store");
  Route.delete("comment/:id", "CommentController.destroy");
  Route.post(":id/bookmark", "BookmarkController.store");
  Route.get(":id/bookmark/validate", "BookmarkController.validate");
  Route.delete(":id/bookmark", "BookmarkController.destroy");
})
  .prefix("api/post")
  .middleware("auth:jwt");
