"use strict";
const User = use("App/Models/User");
const Post = use("App/Models/Post");
const Bookmark = use("App/Models/Bookmark");
class BookmarkController {
  async show({ response, auth }) {
    try {
      let valid = await auth.check();
      if (valid) {
        let user = await auth.getUser();
        let bookmarked = await user.bookmark().fetch();
        let data = await bookmarked.post().fetch();
        console.log(data.toJSON());
        return response.status(200).send({ done: "working" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async validate({ response, params, auth }) {
    let id = params.id;
    let valid = await auth.check();

    try {
      if (valid) {
        let user = await auth.getUser();
        const book = await user.bookmark().where("post_id", id).fetch();
        const data = book.toJSON();
        if (data[0].post_id) {
          return response.status(200).send({ status: true, bookmark: true });
        }
      }
    } catch (error) {
      return response.status(200).send({ status: true, bookmark: false });
    }
    response.status(400).send({ status: false, message: err });
  }
  async store({ request, response, auth, params }) {
    let id = params.id;
    try {
      let valid = await auth.check();
      if (valid) {
        let user = await auth.getUser();
        await user.bookmark().create({ post_id: id });
        return response.status(200).send({ status: true, post_id: id });
      }
    } catch (err) {
      console.log(err);
      /*  response.status(400).send({ status: false, message: err }); */
    }
  }

  async destroy({ response, params, auth }) {
    let id = params.id;
    try {
      let valid = auth.check();
      if (valid) {
        let user = await auth.getUser();
        await user.bookmark().where("post_id", id).delete();
        return response.status(200).send({ status: true });
      }
    } catch (err) {
      response.status(400).send({ status: false, message: err });
    }
  }
}

module.exports = BookmarkController;
