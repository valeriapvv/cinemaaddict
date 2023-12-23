import PopupView from '../../view/popup-view/popup-view.js';
import {remove, render, replace} from '../../framework/render.js';

export default class PopupPresenter {
  #filmId = null;

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
    if (this.#filmId === film.id) {
      return;
    }

    this.#filmId = film.id;

    this.#onShowPopup();

    const prevComponent = this.#popupComponent;

    const comments = this.#commentsModel.getCommentsById(film.comments);

    this.#popupComponent = new PopupView(film, comments);
    this.#setEventHandlers();

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

  #setEventHandlers() {
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
    if (!this.#popupComponent) {
      return;
    }

    if (this.#filmId !== film.id) {
      // this.init(film);
      return;
    }

    this.#popupComponent.updateElement({film});
    this.#setEventHandlers();
  }

  destroy = () => {
    this.#removeComponent();
    this.#onClosePopup();
  };

  #removeComponent() {
    remove(this.#popupComponent);
    this.#popupComponent = null;
    this.#filmId = null;
  }
}
