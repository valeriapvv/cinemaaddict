import PopupView from '../../view/popup-view/popup-view.js';
import {remove, render, replace} from '../../framework/render.js';
import {faker} from '@faker-js/faker';

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

  init(film) {
    // TODO: Рендеринг попапа в отдельный метод
    if (this.#isSameFilm(film)) {
      return;
    }

    this.#film = film;

    this.#onShowPopup();

    const prevComponent = this.#popupComponent;

    this.#comments = this.#getComments(this.#film);

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

  #handleFilmsModelEvent = (_event, updatedFilm) => {
    this.update(updatedFilm);
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

    this.#filmsModel.update({
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

    this.#filmsModel.update({
      ...this.#film,
      comments,
    });

    // TODO: Сбросить состояние комментария при его успешном добавлении
  };

  update(film) {
    if (!this.#popupComponent) {
      return;
    }

    if (!this.#isSameFilm(film)) {
      // this.init(film);
      return;
    }

    const comments = this.#getComments(film);

    this.#popupComponent.updateElement({film, comments});

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
  }

  #isSameFilm(film) {
    return this.#film?.id === film.id;
  }

  #getComments(film) {
    return this.#commentsModel.getCommentsById(film.comments);
  }
}
