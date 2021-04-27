"use strict";

const User = require("../../Models/User");

const Profile = use("App/Models/Profile");

class ProfileController {
  async index({ request, response, auth, params }) {
    let id = params.id;
    console.log(id);
    try {
      const user = await User.find(id);
      await user.loadMany(["posts", "profile"]);
      const posts = user.getRelated("posts");
      const profile = user.getRelated("profile");
      return response.status(200).json({ profile, posts });
    } catch (error) {
      response.status(400).json({ message: error.response });
    }
  }
  async update({ request, response, auth }) {
    try {
      const { name, bio, location, interest, photoUrl } = request.all();
      let valid = await auth.check();
      if (valid) {
        let user = await auth.getUser();
        let profile = await user
          .profile()
          .update({ name, bio, location, interest, photourl: photoUrl.url });
        console.log(profile);
        return response
          .status(200)
          .send({ name, bio, location, interest, image: photoUrl.url });
      } else {
        return response.status(400).send({ message: "invalid user" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProfileController;
