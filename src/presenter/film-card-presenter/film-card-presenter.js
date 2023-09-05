import FilmCardView from '../../view/film-card-view/film-card-view.js';
import {render, replace} from '../../framework/render.js';

export default class FilmCardPresenter {
  #parentElement = null;
  #cardComponent = null;

  #onCardClick = null;
  #onAddToWatchlistClick = null;

  #film = null;

  constructor({
    parentElement,
    onCardClick,
    onAddToWatchlistClick,
  }) {
    this.#parentElement = parentElement;
    this.#onCardClick = onCardClick;
    this.#onAddToWatchlistClick = onAddToWatchlistClick;
  }

  init(film) {
    this.#film = film;

    const prevComponent = this.#cardComponent;

    this.#cardComponent = new FilmCardView(this.#film);
    this.#cardComponent.setCardClick(this.#onCardClick);
    this.#cardComponent.setAddToWatchlistClick(this.#onAddToWatchlistClick);

    if (prevComponent === null) {
      render(this.#cardComponent, this.#parentElement);
      return;
    }

    replace(this.#cardComponent, prevComponent);
  }
}
