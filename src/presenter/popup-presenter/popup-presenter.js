import PopupView from '../../view/popup-view/popup-view.js';
import {remove, render, replace} from '../../framework/render.js';
import {UpdateType} from '../../data/constants.js';

export default class PopupPresenter {
  #film = null;
  #comments = null;

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

  async init(film) {
    if (this.#isSameFilm(film)) {
      return;
    }

    this.#film = film;

    await this.#loadComments(film.id);

    this.#renderPopup();

    this.#onShowPopup();
  }

  async #loadComments(filmId) {
    await this.#commentsModel.init(filmId);
    this.#comments = this.#commentsModel.comments;
  }

  #renderPopup() {
    const prevComponent = this.#popupComponent;

    this.#popupComponent = new PopupView(this.#film, this.#comments);
    this.#setEventHandlers();

    if (prevComponent === null) {
      render(
        this.#popupComponent,
        this.#parentElement,
      );

      this.#filmsModel.addObserver(this.#handleFilmsModelEvent);
      return;
    }

    replace(this.#popupComponent, prevComponent);
    remove(prevComponent);
  }

  #handleFilmsModelEvent = (event, updatedFilm) => {
    const isCommentAdd = event === UpdateType.CommentAdd;

    this.update(updatedFilm, {
      resetCommentForm: isCommentAdd,
      unblockForm: isCommentAdd,
    });
  };

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

    if (this.#onCommentDelete) {
      this.#popupComponent.setCommentDelete(this.#onCommentDelete);
    }

    this.#popupComponent.setCommentSubmit(this.#onCommentSubmit);
  }

  #onCommentDelete = async (commentId) => {
    const comments = await this.#commentsModel.delete(commentId);

    this.#filmsModel.updateComments(
      UpdateType.CommentDelete,
      this.#film.id,
      comments,
    );
  };

  #onCommentSubmit = async (newComment) => {
    this.#popupComponent.blockForm();

    const filmId = this.#film.id;
    const comments = await this.#commentsModel.add(filmId, newComment);

    this.#filmsModel.updateComments(
      UpdateType.CommentAdd,
      filmId,
      comments,
    );
  };

  update(film, options) {
    if (!this.#popupComponent) {
      return;
    }

    if (!this.#isSameFilm(film)) {
      // this.init(film);
      return;
    }

    const comments = this.#commentsModel.comments;

    this.#popupComponent.updateElement({film, comments}, options);

    this.#film = film;
    this.#comments = comments;
  }

  destroy = () => {
    this.#removeComponent();
    this.#onClosePopup();
  };

  #removeComponent() {
    remove(this.#popupComponent);
    this.#popupComponent = null;
    this.#film = null;
    this.#comments = null;
  }

  #isSameFilm(film) {
    return this.#film?.id === film.id;
  }
}
