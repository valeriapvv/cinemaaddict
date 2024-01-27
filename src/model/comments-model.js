import Observable from '../framework/observable.js';
import {generateComment} from '../mock/comment.js';
import {COMMENTS_COUNT} from '../mock/constants.js';

export default class CommentsModel extends Observable {
  #comments = null;

  get comments() {
    if (this.#comments === null) {
      this.#comments = Array.from({length: COMMENTS_COUNT}, generateComment);
    }

    return [...this.#comments];
  }

  getCommentsById(idList) {
    return idList.map((id) => this.comments.find((comment) => comment.id === id));
  }

  delete(commentId) {
    const comments = this.#comments;
    const index = comments.findIndex((({id}) => id === commentId));

    this.#comments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1),
    ];

    this._notify(null, commentId);
  }
}
