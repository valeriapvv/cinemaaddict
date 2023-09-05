
import AbstractView from '../../framework/view/abstract-view.js';
import {
  getFilmCardTemplate,
  FILM_LINK_CLASS_NAME,
  ADD_TO_WATCHLIST_CLASS_NAME
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

  setCardClick(onClick) {
    this._callback.cardClick = onClick;
    const linkElement = this.element.querySelector(`.${FILM_LINK_CLASS_NAME}`);

    linkElement.addEventListener('click', this.#onCardClick);
  }

  #onCardClick = (evt) => {
    evt.preventDefault();
    this._callback.cardClick(this.#film);
  };

  setAddToWatchlistClick(onClick) {
    this._callback.addToWatchlistClick = onClick;
    const addToWatchlistButton = this.element.querySelector(`.${ADD_TO_WATCHLIST_CLASS_NAME}`);

    addToWatchlistButton.addEventListener('click', this.#onAddToWatchlistClick);
  }

  #onAddToWatchlistClick = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchlistClick(this.#film);
  };
}
