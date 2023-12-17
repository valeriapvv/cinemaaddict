import PopupView from '../../view/popup-view/popup-view.js';
import {remove, render, replace} from '../../framework/render.js';

export default class PopupPresenter {
  #parentElement = null;
  #popupComponent = null;

  #commentsModel = null;

  #onShowPopup = null;
  #onClosePopup = null;
  #onAddToWatchlistClick = null;
  #onAlreadyWatchedClick = null;
  #onFavoriteClick = null;

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
    const prevComponent = this.#popupComponent;

    const comments = this.#commentsModel.getCommentsById(film.comments);

    this.#popupComponent = new PopupView(film, comments);
    this.#setInnerEventHandlers();

    this.#onShowPopup();

    if (prevComponent === null) {
      render(
        this.#popupComponent,
        this.#parentElement,
      );
      return;
    }

    replace(this.#popupComponent, prevComponent);
    remove(prevComponent);
  }

  addEventHandlers({
    onAddToWatchlistClick = null,
    onAlreadyWatchedClick = null,
    onFavoriteClick = null,
  }) {
    this.#onAddToWatchlistClick = onAddToWatchlistClick;
    this.#onAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#onFavoriteClick = onFavoriteClick;
  }

  #setInnerEventHandlers() {
    this.#popupComponent.setClose(this.destroy);

    if (this.#onAddToWatchlistClick) {
      this.#popupComponent.setAddToWatchlistClick(this.#onAddToWatchlistClick);
    }

    if (this.#onAlreadyWatchedClick) {
      this.#popupComponent.setAlreadyWatchedClick(this.#onAlreadyWatchedClick);
    }

    if (this.#onFavoriteClick) {
      this.#popupComponent.setFavoriteClick(this.#onFavoriteClick);
    }
  }

  update(film) {
    if (this.#popupComponent) {
      this.init(film);
    }
  }

  destroy = () => {
    this.#removeComponent();
    this.#onClosePopup();
  };

  #removeComponent() {
    if (this.#popupComponent) {
      remove(this.#popupComponent);
      this.#popupComponent = null;
    }
  }
}
