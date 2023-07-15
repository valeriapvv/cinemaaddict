import PopupView from '../view/popup-view/popup-view.js';
import {render} from '../render.js';

export default class PopupPresesnter {
  #parentElement = null;

  #filmsModel = null;
  #commentsModel = null;

  #onShowPopup = null;

  #currentFilm = null;

  constructor({
    parentElement,
    filmsModel,
    commentsModel,
    onShowPopup,
  }) {
    this.#parentElement = parentElement;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#onShowPopup = onShowPopup;
  }

  init() {
    this.#currentFilm = this.#filmsModel.films[0];

    render(
      new PopupView(this.#currentFilm, this.#getCommentsById()),
      this.#parentElement,
    );

    this.#onShowPopup();
  }

  #getCommentsById() {
    const commentsIds = this.#currentFilm.comments;
    const allComments = this.#commentsModel.comments;

    return commentsIds.map((id) => allComments.find((comment) => comment.id === id));
  }
}
