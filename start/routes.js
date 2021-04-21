"use strict";

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

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

//register & login
Route.group(() => {
  Route.post("signup", "UserController.signup");
  Route.post("login", "UserController.login");
}).prefix("api");

Route.group(() => {
  Route.post("create", "PostController.create");
  Route.get("profile", "ProfileController.index");
  Route.put("profile/", "ProfileController.update");
  Route.get("validate", "UserController.validate");
})
  .prefix("api/user")
  .middleware("auth:jwt");
