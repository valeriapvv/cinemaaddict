import {filmsComments} from '../../mock/comments.js';

export default class CommentsModel {
  #comments = null;

  get comments() {
    if (this.#comments === null) {
      this.#comments = filmsComments;
    }

    return [...this.#comments];
  }

  getCommentsById(idList) {
    const comments = this.comments;
    return idList.map((id) => comments.find((comment) => comment.id === id));
  }

  delete(commentId) {
    const comments = this.comments;
    const index = comments.findIndex((({id}) => id === commentId));

    this.#comments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1),
    ];
  }

  add(comment) {
    this.#comments = [
      ...this.comments,
      comment,
    ];
  }
}
