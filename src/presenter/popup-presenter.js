import PopupView from '../view/popup-view/popup-view.js';
import {render} from '../render.js';

export default class PopupPresenter {
  #parentElement = null;
  #popupComponent = null;

  #commentsModel = null;

  #onShowPopup = null;

  constructor({
    parentElement,
    commentsModel,
    onShowPopup,
  }) {
    this.#parentElement = parentElement;
    this.#commentsModel = commentsModel;
    this.#onShowPopup = onShowPopup;
  }

  init(film) {
    if (this.#popupComponent) {
      this.#popupComponent.removeElement();
    }

    this.#popupComponent = new PopupView(film, this.#getCommentsById(film.comments));

    render(
      this.#popupComponent,
      this.#parentElement,
    );

    this.#onShowPopup();
  }

  #getCommentsById(commentsIds) {
    const allComments = this.#commentsModel.comments;

    return commentsIds.map((id) => allComments.find((comment) => comment.id === id));
  }
}
