import PopupView from '../../view/popup-view/popup-view.js';
import {remove, render, replace} from '../../framework/render.js';
import {faker} from '@faker-js/faker';
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
    this.update(updatedFilm, {
      resetCommentForm: event === UpdateType.CommentAdd,
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

    if (this.#comments?.length) {
      this.#popupComponent.setCommentDelete(this.#onCommentDelete);
    }

    this.#popupComponent.setCommentSubmit(this.#onCommentSubmit);
  }

  #onCommentDelete = (commentId) => {
    this.#commentsModel.delete(commentId);

    const comments = this.#film
      .comments
      .filter(((id) => id !== commentId));

    this.#filmsModel.update(UpdateType.CommentDelete, {
      ...this.#film,
      comments,
    });
  };

  #onCommentSubmit = (newComment) => {
    const newCommentId = faker.string.nanoid();

    this.#commentsModel.add({
      ...newComment,

      // TODO: Убрать добавление полей:
      id: newCommentId,
      author: 'John Doe',
      date: new Date().toISOString(),
    });

    const comments = [
      ...this.#film.comments,
      newCommentId,
    ];

    this.#filmsModel.update(UpdateType.CommentAdd, {
      ...this.#film,
      comments,
    });
  };

  update(film, options) {
    if (!this.#popupComponent) {
      return;
    }

    if (!this.#isSameFilm(film)) {
      // this.init(film);
      return;
    }

    const comments = this.#getComments(film);

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

  #getComments(film) {
    return this.#commentsModel.getCommentsById(film.comments);
  }
}
