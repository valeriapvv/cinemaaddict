import Observable from '../framework/observable.js';
import {FILMS_COUNT} from '../mock/constants.js';
import {generateFilm} from '../mock/film.js';

export default class FilmsModel extends Observable {
  #films = null;

  get films() {
    if (this.#films === null) {
      this.#films = Array.from({length: FILMS_COUNT}, generateFilm);
    }

    return [...this.#films];
  }

  update(updatedFilm) {
    const prevFilms = this.#films;
    const index = prevFilms.findIndex(({id}) => id === updatedFilm.id);

    this.#films = [
      ...prevFilms.slice(0, index),
      updatedFilm,
      ...prevFilms.slice(index + 1),
    ];

    this._notify(null, updatedFilm);
  }
}
