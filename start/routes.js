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
  Route.get("validate", "UserController.validate");
}).prefix("api");

Route.group(() => {
  Route.get("/:id", async ({ request, auth }) => {
    try {
      const loggedInUser = await auth.getUser();
      return {
        id: loggedInUser.id,
        email: loggedInUser.email,
      };
    } catch (error) {
      // console.log(
      //   'Error', error
      // )
      return response.status(401).send("Login First");
    }
  });
  //subscription route
  // Route.post("/subscription", "SubscriptionController.subscribe");
})
  .prefix("api/user")
  .middleware("auth:jwt");
