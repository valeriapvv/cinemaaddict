export default class CommentsModel {
  #comments = null;

  #api = null;

  constructor({
    api,
  }) {
    this.#api = api;
  }

  async init(filmId) {
    const comments = await this.#api.getComments(filmId);
    this.#comments = comments;
  }

  get comments() {
    return [...this.#comments];
  }

  async delete(commentId) {
    await this.#api.deleteComment(commentId);

    const comments = this.comments;
    const index = comments.findIndex((({id}) => id === commentId));

    this.#comments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1),
    ];

    return this.comments;
  }

  async add(filmId, comment) {
    const {comments} = await this.#api.submitComment(filmId, comment);

    this.#comments = comments;

    return this.comments;
  }
}
