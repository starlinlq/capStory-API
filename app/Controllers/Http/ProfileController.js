"use strict";
const Profile = use("App/Models/Profile");

class ProfileController {
  async index({ request, response, auth }) {
    try {
      let valid = await auth.check();

      if (valid) {
        let user = await auth.getUser();
        let profile = await user.profile().fetch();
        return response.status(200).json({ profile });
      }

      response.status(200).send({ profile });
    } catch (error) {
      console.log;
      response.status(400).json({ message: error.response });
    }
  }
  async update({ request, response, auth }) {
    try {
      const data = request.all();
      console.log(data);
      return response.status(200).json({ done: "yes" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProfileController;
