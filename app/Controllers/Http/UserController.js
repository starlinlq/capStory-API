"use strict";

const User = use("App/Models/User");

const cookie = require("cookie");

class UserController {
  async signup({ request, auth, response }) {
    try {
      // save user to database
      const userData = request.only(["email", "password", "username"]);
      // console.log("try", userData)
      const user = await User.create(userData);

      console.log("await User create");
      // generate JWT token for user
      const jwt = await auth.generate(user);
      console.log("token", jwt);
      response.header(
        "Set-Cookie",
        cookie.serialize("bvf", jwt.token, {
          httpOnly: false,
          secure: false,
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      );
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
        return response.status(200).json({
          status: "success",
          user: {
            username: user.username,
            id: user.id,
            bio: user.bio,
            interest: user.interest,
            location: user.location,
            photoUrl: user.photurl,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async login({ request, response, auth }) {
    try {
      let { email, password } = request.all();
      let user = await auth.attempt(email, password);

      //get posts data and profile
      //const users = await User.query().with("posts").with("profile").fetch();

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
