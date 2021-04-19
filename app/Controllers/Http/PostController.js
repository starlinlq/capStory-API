"use strict";
const User = use("App/Models/User");
const Post = use("App/Models/Post");
const Topic = use('App/Models/Topic')
class PostController {
  async create({ request, response, auth }) {
    const { title, story, topic, author } = request.all();

    try {
      const valid = await auth.check();
      if (valid) {
        let user = await auth.getUser();
        const post = user.posts().create({ title, story, author, topic });

        console.log(post);
        return response.status(200).json({ ok: "done" });
      }
    } catch (error) {
      response.status(400).send({ message: error });
    }
  }
}

module.exports = PostController;
