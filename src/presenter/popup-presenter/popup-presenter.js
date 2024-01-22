import PopupView from '../../view/popup-view/popup-view.js';
import {remove, render, replace} from '../../framework/render.js';

export default class PopupPresenter {
  #filmId = null;
  #comments = [];

  #parentElement = null;
  #popupComponent = null;

  #filmsModel = null;
  #commentsModel = null;

  #onShowPopup = null;
  #onClosePopup = null;
  #onAddToWatchlistClick = null;
  #onAlreadyWatchedClick = null;
  #onFavoriteClick = null;

  constructor({
    parentElement,
    filmsModel,
    commentsModel,
    onShowPopup,
    onClosePopup,
  }) {
    this.#parentElement = parentElement;
    this.#commentsModel = commentsModel;
    this.#onShowPopup = onShowPopup;
    this.#onClosePopup = onClosePopup;
    this.#filmsModel = filmsModel;
  }

  init(film) {
    if (this.#filmId === film.id) {
      return;
    }

    this.#filmId = film.id;

    this.#onShowPopup();

    const prevComponent = this.#popupComponent;

    this.#comments = this.#commentsModel.getCommentsById(film.comments);

    this.#popupComponent = new PopupView(film, this.#comments);
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

    if (this.#comments.length) {
      this.#popupComponent.setCommentDelete(this.#onCommentDelete);
    }
  }

  #onCommentDelete = (commentId) => {
    // 1. Удалить коммент из commentsModel;

    // 2. Удалить id коммента текущего фильма (filmsModel);
  };

  update(film) {
    if (!this.#popupComponent) {
      return;
    }

    if (this.#filmId !== film.id) {
      // this.init(film);
      return;
    }

    this.#popupComponent.updateElement({film});
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
