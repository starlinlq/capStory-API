"use strict";
const Post = use("App/Models/Post");
const Comment = use("App/Models/Comment");
class CommentController {
  async show({ params, response }) {}

  async store({ request, response, params, auth }) {
    const { comment } = request.all();
    let id = params.id;
    console.log(comment, id);
    try {
      let valid = await auth.check();
      if (valid) {
        let user = await auth.getUser();
        let post = await Post.find(id);
        let newComment = await post.comment().create({ comment });
        await newComment.user().associate(user);
        let currentComments = await post
          .comment()
          .orderBy("id", "desc")
          .fetch();
        return response.status(200).send({ status: true, currentComments });
      }
    } catch (error) {
      response.status(400).send({ status: false, message: error.message });
    }
  }

  async destroy({ response, params, auth }) {
    let id = params.id;

    try {
      let comment = await Comment.find(id);
      let post = await Post.find(comment.post_id);
      await post.comment().where("id", id).delete();
      let currentComments = await post.comment().fetch();
      return response
        .status(200)
        .send({ status: true, comments: currentComments });
    } catch (error) {
      response.status(400).send({ message: error.message });
    }
  }
}

module.exports = CommentController;
