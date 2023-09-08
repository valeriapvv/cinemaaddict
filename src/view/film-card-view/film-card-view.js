
import AbstractView from '../../framework/view/abstract-view.js';
import {
  getFilmCardTemplate,
  FILM_LINK_CLASS_NAME,
  ADD_TO_WATCHLIST_CLASS_NAME,
  ALREADY_WATCHED_CLASS_NAME,
  ADD_TO_FAVORITES_CLASS_NAME
} from './template.js';

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return getFilmCardTemplate(this.#film);
  }

  // Card click

  setCardClick(onClick) {
    this._callback.cardClick = onClick;
    const linkElement = this.element.querySelector(`.${FILM_LINK_CLASS_NAME}`);

    linkElement.addEventListener('click', this.#onCardClick);
  }

  #onCardClick = (evt) => {
    evt.preventDefault();
    this._callback.cardClick(this.#film);
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
}
