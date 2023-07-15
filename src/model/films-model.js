import {FILMS_COUNT} from '../mock/constants.js';
import {generateFilm} from '../mock/film.js';

export default class FilmsModel {
  #films = null;

  get films() {
    if (this.#films === null) {
      this.#films = Array.from({length: FILMS_COUNT}, generateFilm);
    }

    return [...this.#films];
  }
}
