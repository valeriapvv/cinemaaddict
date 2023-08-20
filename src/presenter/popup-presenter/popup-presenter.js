import PopupView from '../../view/popup-view/popup-view.js';
import {render} from '../../render.js';

export default class PopupPresenter {
  #parentElement = null;
  #popupComponent = null;

  #commentsModel = null;

  #onShowPopup = null;
  #onClosePopup = null;

  constructor({
    parentElement,
    commentsModel,
    onShowPopup,
    onClosePopup,
  }) {
    this.#parentElement = parentElement;
    this.#commentsModel = commentsModel;
    this.#onShowPopup = onShowPopup;
    this.#onClosePopup = onClosePopup;
  }

  init(film) {
    this.#removeComponent();

    const comments = this.#commentsModel.getCommentsById(film.comments);

    this.#popupComponent = new PopupView(film, comments);
    this.#popupComponent.setClose(this.#onClose);

    render(
      this.#popupComponent,
      this.#parentElement,
    );

    this.#onShowPopup();
  }

  #onClose = () => {
    this.#removeComponent();
    this.#onClosePopup();
  };

  #removeComponent() {
    if (this.#popupComponent) {
      this.#popupComponent.removeElement();
      this.#popupComponent = null;
    }
  }
}
