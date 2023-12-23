import dayjs from 'dayjs';
import {formatMinutes} from '../../utils.js';
import {EMOTIONS} from '../../data/constants.js';

export const CLOSE_BUTTON_CLASS_NAME = 'film-details__close-btn';

export const ADD_TO_WATCHLIST_CLASS_NAME = 'film-details__control-button--add-to-watchlist';

export const ALREADY_WATCHED_CLASS_NAME = 'film-details__control-button--mark-as-watched';

export const ADD_TO_FAVORITES_CLASS_NAME = 'film-details__control-button--favorite';

export const COMMENT_INPUT_CLASS_NAME = 'film-details__comment-input';

export const EMOJI_LIST_CLASS_NAME = 'film-details__emoji-list';

const getPosterTemplate = ({poster, ageRating}) => (`
    <div class="film-details__poster">
      <img class="film-details__poster-img" src="${poster}" alt="">
      <p class="film-details__age">${ageRating}+</p>
    </div>
  `);

const getInfoHeadTemplate = ({
  title,
  alternativeTitle,
  totalRating,
}) => (`
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${title}</h3>
        <p class="film-details__title-original">${alternativeTitle}</p>
      </div>

      <div class="film-details__rating">
        <p class="film-details__total-rating">${totalRating}</p>
      </div>
    </div>
  `);

const getGenreItemsTemplate = ({genre}) => genre
  .map((genreItem) => `
    <span class="film-details__genre">${genreItem}</span>
  `)
  .join('');

const getDetailsTableTemplate = ({
  director,
  writers,
  actors,
  release: {
    date,
    releaseCountry,
  },
  runtime,
  genre,
}) => {
  const formatedReleaseDate = dayjs(date).format('DD MMMM YYYY');

  return (`
    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${writers.join(', ')}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${actors.join(', ')}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${formatedReleaseDate}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${formatMinutes(runtime)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${releaseCountry}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Genres</td>
        <td class="film-details__cell">
          ${getGenreItemsTemplate({genre})}
        </td>
      </tr>
  </table>
  `);
};

const getControlsTemplate = ({
  watchlist,
  alreadyWatched,
  favorite,
}) => {
  const controlActiveClassName = 'film-details__control-button--active';

  return (`
    <section class="film-details__controls">
      <button
        class="
          film-details__control-button
          ${ADD_TO_WATCHLIST_CLASS_NAME}
          ${watchlist ? controlActiveClassName : ''}
        "
        type="button"
        id="watchlist"
        name="watchlist"
      >
        Add to watchlist
      </button>

      <button
        class="
          film-details__control-button
          ${ALREADY_WATCHED_CLASS_NAME}
          ${alreadyWatched ? controlActiveClassName : ''}
        "
        type="button"
        id="watched"
        name="watched"
      >
        Already watched
      </button>

      <button
        type="button"
        class="
          film-details__control-button
          ${ADD_TO_FAVORITES_CLASS_NAME}
          ${favorite ? controlActiveClassName : ''}
        "
        id="favorite"
        name="favorite"
      >
        Add to favorites
      </button>
    </section>
  `);
};

const getCommentTemplate = ({
  author,
  comment,
  date,
  emotion,
}) => (`
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dayjs(date).format('YYYY/MM/DD HH:mm')}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
`);

const getCommentsListTemplate = (comments) => (`
    <ul class="film-details__comments-list">
      ${comments.map(getCommentTemplate).join('')}
    </ul>
  `);

const getNewCommentBlockTemplate = ({
  comment,
  emotion: currentEmotion,
} = {}) => (`
    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea
          class="${COMMENT_INPUT_CLASS_NAME}"
          placeholder="Select reaction below and write comment here"
          name="comment"
        >${
  comment || ''
  }</textarea>
      </label>

      <div class="${EMOJI_LIST_CLASS_NAME}">
        ${EMOTIONS.map((emotion) => `
          <input
            class="film-details__emoji-item visually-hidden"
            name="comment-emoji"
            type="radio"
            id="emoji-${emotion}"
            value="${emotion}"
            ${emotion === currentEmotion ? 'checked' : ''}
          >
          <label class="film-details__emoji-label" for="emoji-${emotion}">
            <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
          </label>
        `).join('')}
      </div>
    </div>
 `);

export const getPopupTemplate = ({
  film,
  comments,
  newComment,
}) => {
  const {description} = film.filmInfo;

  const commentsCount = film.comments.length;

  return (`
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">

          <div class="film-details__close">
            <button class="${CLOSE_BUTTON_CLASS_NAME}" type="button">close</button>
          </div>

          <div class="film-details__info-wrap">
            ${getPosterTemplate(film.filmInfo)}

            <div class="film-details__info">
              ${getInfoHeadTemplate(film.filmInfo)}

              ${getDetailsTableTemplate(film.filmInfo)}

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          ${getControlsTemplate(film.userDetails)}
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">
              Comments <span class="film-details__comments-count">${commentsCount}</span>
            </h3>

            ${getCommentsListTemplate(comments)}

            ${getNewCommentBlockTemplate(newComment)}
          </section>
        </div>
      </form>
    </section>
  `);
};
