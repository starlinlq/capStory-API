"use strict";
const User = use("App/Models/User");
const Post = use("App/Models/Post");
const Topic = use("App/Models/Topic");
const Database = use("Database");
class PostController {
  async index({ request, response, auth }) {
    const { id } = request.all();
    try {
      if (id) {
        let user = await User.find(id);
        let posts = await user.posts().fetch();
        return response.status(200).send({ testing: posts });
      }
    } catch (error) {
      return response.status(400).send({ message: error.message });
    }
  }

  async show({ request, response, auth }) {
    try {
      const posts = await Database.table("posts").limit(8);

      return response.status(200).json({ posts });
    } catch (error) {
      console.log(error);
    }
  }

  async single({ request, response, params }) {
    let id = params.id;

    try {
      let post = await Post.query().where("id", id).with("comment").fetch();
      return response.status(200).json({ post });
    } catch (error) {
      console.log(error);
      return response.status(400).send({ message: error.message });
    }
  }

  async create({ request, response, auth }) {
    const { title, story, topic, author, image } = request.all();

    try {
      const valid = await auth.check();
      console.log(image);
      if (valid) {
        let user = await auth.getUser();
        await user.posts().create({ title, story, author, image });
        /* let validateTopic = await Topic.where("title", topic).fetch();
        if (validateTopic) {
          await validateTopic.posts().sync([post.id]);
        } else {
          let newTopic = await Topic.create({ title: topic });
          newTopic.posts().sync([post.id]);
        } */

        return response.status(200).json({ ok: "done" });
      }
    } catch (error) {
      return response.status(400).send({ message: error });
    }
  }
}

module.exports = PostController;
