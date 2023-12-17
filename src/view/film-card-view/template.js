import {formatMinutes} from '../../utils.js';

export const FILM_LINK_CLASS_NAME = 'film-card__link';

export const ADD_TO_WATCHLIST_CLASS_NAME = 'film-card__controls-item--add-to-watchlist';

export const ALREADY_WATCHED_CLASS_NAME = 'film-card__controls-item--mark-as-watched';

export const ADD_TO_FAVORITES_CLASS_NAME = 'film-card__controls-item--favorite';

export const getFilmCardTemplate = (film) => {
  const CONTROL_ACTIVE_CLASS_NAME = 'film-card__controls-item--active';

  const {id, filmInfo, userDetails, comments} = film;

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
  } = filmInfo;

  const {
    watchlist,
    alreadyWatched,
    favorite,
  } = userDetails;

  const commentsCount = comments.length;

  const year = new Date(date).getFullYear();

  const duration = formatMinutes(runtime);

  return (`
    <article class="film-card" data-film-id="${id}">
      <a class="${FILM_LINK_CLASS_NAME}">
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
            ${ADD_TO_WATCHLIST_CLASS_NAME}
            ${watchlist ? CONTROL_ACTIVE_CLASS_NAME : ''}
          "
          type="button"
        >
          Add to watchlist
        </button>

        <button
          class="
            film-card__controls-item
            ${ALREADY_WATCHED_CLASS_NAME}
            ${alreadyWatched ? CONTROL_ACTIVE_CLASS_NAME : ''}
          "
          type="button"
        >
          Mark as watched
        </button>

        <button
          class="
            film-card__controls-item
            ${ADD_TO_FAVORITES_CLASS_NAME}
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
