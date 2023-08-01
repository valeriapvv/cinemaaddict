import {generateComment} from '../mock/comment.js';
import {COMMENTS_COUNT} from '../mock/constants.js';

export default class CommentsModel {
  #comments = null;

  get comments() {
    if (this.#comments === null) {
      this.#comments = Array.from({length: COMMENTS_COUNT}, generateComment);
    }

    return [...this.#comments];
  }
}
