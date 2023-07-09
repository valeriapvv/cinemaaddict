import AbstractView from '../framework/abstract-view.js';
import {formatMinutes} from '../utils.js';

const getFilmCardTemplate = (film) => {
  const CONTROL_ACTIVE_CLASS_NAME = 'film-card__controls-item--active';

  const {
    title,
    totalRating,
    release: {
      date,
    },
    runtime,
    genre,
    poster,
    description,
  } = film.filmInfo;

  const {
    watchList,
    alreadyWatched,
    favorite,
  } = film.userDetails;

  const commentsCount = film.comments.length;

  const year = new Date(date).getFullYear();

  const duration = formatMinutes(runtime);

  return (`
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre.join(', ')}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${commentsCount} comments</span>
      </a>
      <div class="film-card__controls">
        <button
          class="
            film-card__controls-item
            film-card__controls-item--add-to-watchlist
            ${watchList ? CONTROL_ACTIVE_CLASS_NAME : ''}
          "
          type="button"
        >
          Add to watchlist
        </button>

        <button
          class="
            film-card__controls-item
            film-card__controls-item--mark-as-watched
            ${alreadyWatched ? CONTROL_ACTIVE_CLASS_NAME : ''}
          "
          type="button"
        >
          Mark as watched
        </button>

        <button
          class="
            film-card__controls-item
            film-card__controls-item--favorite
            ${favorite ? CONTROL_ACTIVE_CLASS_NAME : ''}
          "
          type="button"
        >
          Mark as favorite
        </button>
      </div>
    </article>
  `);
};

export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this.film = film;
  }

  getTemplate() {
    return getFilmCardTemplate(this.film);
  }
}
