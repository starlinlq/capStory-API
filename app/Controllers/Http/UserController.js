"use strict";

const User = use("App/Models/User");
const Profile = use("App/Models/Profile");

const cookie = require("cookie");

class UserController {
  async signup({ request, auth, response }) {
    try {
      // save user to database
      const { email, password, username } = request.all();
      let userData = { email, password };
      const user = await User.create(userData);
      await user.profile().create({
        name: username,
        bio: "",
        interest: "",
        location: "",
        photourl: "https://i.redd.it/v7h9zrkm4vi41.jpg",
      });

      // generate JWT token for user
      const jwt = await auth.generate(user);

      /*  response.header(
        "Set-Cookie",
        cookie.serialize("bvf", jwt.token, {
          httpOnly: false,
          secure: false,
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      ); */
      return response.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        token: jwt.token,
        status: "success",
      });
    } catch (error) {
      console.log("error", error);
      return response.status(400).json({
        status: "error",
        message:
          "There was a problem creating the user, please try again later.",
      });
    }
  }

  async validate({ auth, response, request }) {
    try {
      let valid = await auth.check();

      if (valid) {
        let user = await auth.getUser();
        let data = await user.profile().fetch();
        let profile = data.toJSON();

        return response.status(200).json({
          status: "success",
          user: {
            id: user.id,
            profile,
          },
        });
      }
    } catch (err) {
      console.log(err);
      response.status(400).json({ message: { error: err.response } });
    }
  }

  async login({ request, response, auth }) {
    try {
      let { email, password } = request.all();
      let user = await auth.attempt(email, password);

      //get posts data and profile
      const userData = await User.query()
        .where("email", "=", email)
        .with("posts")
        .with("profile")
        .fetch();
      console.log(userData);

      //get posts data
      /* const users = await User.query().with("posts").fetch(); */
      // serialize the data
      // data users.toJSON()

      console.log("userlogin data", user);
      // generate JWT token for user
      // const jwt = await auth.generate(user)
      response.header(
        "Set-Cookie",
        cookie.serialize("bvf", user.token, {
          httpOnly: false,
          secure: false,
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      );
      try {
        const loggedInUser = await User.query()
          .where("email", "=", email)
          .first();
        console.log(loggedInUser.id);
        return response.status(200).json({
          user: { id: loggedInUser.id, username: loggedInUser.username },
          token: user.token,
          status: "success",
        });
      } catch (error) {
        console.log("getting user", error);
      }
      // console.log('auth', await auth)
    } catch (error) {
      console.log("error", error);
      return response.status(401).json({
        status: "error",
        message: "Error logging in. 2.",
      });
    }

    // try {
    //   let params = request.all()
    //   let login = await auth.attempt(params.email, params.password);
    //   console.log('login data', login)

    //   response.header('Authorization', `Bearer ${login.token}`)

    //   return response.status(200).json({...login})
    // } catch (error) {
    //   // console.log("error", error)
    //     return response.status(401).json({
    //         status: 'error',
    //         message: 'Error logging in. 2.'
    //     })
    // }
  }
}
module.exports = UserController;
