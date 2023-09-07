import FilmCardView from '../../view/film-card-view/film-card-view.js';
import {render, replace} from '../../framework/render.js';

export default class FilmCardPresenter {
  #parentElement = null;
  #cardComponent = null;

  #onCardClick = null;
  #onAddToWatchlistClick = null;
  #onAlreadyWatchedClick = null;
  #onFavoriteClick = null;

  #film = null;

  constructor({
    parentElement,
    onCardClick,
    onAddToWatchlistClick,
    onAlreadyWatchedClick,
    onFavoriteClick,
  }) {
    this.#parentElement = parentElement;
    this.#onCardClick = onCardClick;
    this.#onAddToWatchlistClick = onAddToWatchlistClick;
    this.#onAlreadyWatchedClick = onAlreadyWatchedClick;
    this.#onFavoriteClick = onFavoriteClick;
  }

  init(film) {
    this.#film = film;

    const prevComponent = this.#cardComponent;

    this.#cardComponent = new FilmCardView(this.#film);
    this.#setHandlers();

    if (prevComponent === null) {
      render(this.#cardComponent, this.#parentElement);
      return;
    }

    replace(this.#cardComponent, prevComponent);
  }

  #setHandlers() {
    this.#cardComponent.setCardClick(this.#onCardClick);
    this.#cardComponent.setAddToWatchlistClick(this.#onAddToWatchlistClick);
    this.#cardComponent.setAlreadyWatchedClick(this.#onAlreadyWatchedClick);
    this.#cardComponent.setFavoriteClick(this.#onFavoriteClick);
  }
}
