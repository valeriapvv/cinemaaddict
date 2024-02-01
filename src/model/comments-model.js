import {comments} from '../mock/comments.js';

export default class CommentsModel {
  #comments = null;

  get comments() {
    if (this.#comments === null) {
      this.#comments = comments;
    }

    return [...this.#comments];
  }

  getCommentsById(idList) {
    return idList.map((id) => this.comments.find((comment) => comment.id === id));
  }

  delete(commentId) {
    const index = this.#comments.findIndex((({id}) => id === commentId));

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];
  }

  add(comment) {
    this.#comments = [
      ...this.#comments,
      comment,
    ];
  }
}
