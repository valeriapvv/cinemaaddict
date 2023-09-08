import AbstractView from '../../framework/view/abstract-view.js';
import {
  CLOSE_BUTTON_CLASS_NAME,
  ADD_TO_FAVORITES_CLASS_NAME,
  ADD_TO_WATCHLIST_CLASS_NAME,
  ALREADY_WATCHED_CLASS_NAME,
  getPopupTemplate,
} from './template.js';

// TODO: Повторяется код FilmCardView по навешиванию обработчиков

export default class PopupView extends AbstractView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return getPopupTemplate(this.#film, this.#comments);
  }

  // onClose

  setClose(onClose) {
    this._callback.close = onClose;

    const closeButton = this.element.querySelector(`.${CLOSE_BUTTON_CLASS_NAME}`);

    // TODO: закрытие по клику вне попапа

    closeButton.addEventListener('click', this.#onClick);
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  #onClick = () => {
    this._callback.close();
  };

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this._callback.close();
    }
  };

  // Add to watchlist click

  setAddToWatchlistClick(onClick) {
    this._callback.addToWatchlistClick = onClick;
    const addToWatchlistButton = this.element.querySelector(`.${ADD_TO_WATCHLIST_CLASS_NAME}`);

    addToWatchlistButton.addEventListener('click', this.#onAddToWatchlistClick);
  }

  #onAddToWatchlistClick = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchlistClick(this.#film);
  };

  // Already watched click

  setAlreadyWatchedClick(onClick) {
    this._callback.alreadyWatchedClick = onClick;
    const alreadyWatchedButton = this.element.querySelector(`.${ALREADY_WATCHED_CLASS_NAME}`);

    alreadyWatchedButton.addEventListener('click', this.#onAlreadyWatchedClick);
  }

  #onAlreadyWatchedClick = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick(this.#film);
  };

  // Favorite click

  setFavoriteClick(onClick) {
    this._callback.favoriteClick = onClick;
    const favoriteButton = this.element.querySelector(`.${ADD_TO_FAVORITES_CLASS_NAME}`);

    favoriteButton.addEventListener('click', this.#onFavoriteClick);
  }

  #onFavoriteClick = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick(this.#film);
  };

  #removeHandlers = () => {
    document.removeEventListener('keydown', this.#onEscKeydown);
  };

  removeElement() {
    this.#removeHandlers();
    super.removeElement();
  }
}
