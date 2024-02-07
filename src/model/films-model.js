import Observable from '../framework/observable.js';
import {films} from '../mock/films.js';

export default class FilmsModel extends Observable {
  #films = null;

  get films() {
    if (this.#films === null) {
      this.#films = films;
    }

    return [...this.#films];
  }

  update(event, updatedFilm) {
    const prevFilms = this.#films;
    const index = prevFilms.findIndex(({id}) => id === updatedFilm.id);

    this.#films = [
      ...prevFilms.slice(0, index),
      updatedFilm,
      ...prevFilms.slice(index + 1),
    ];

    this._notify(event, updatedFilm);
  }
}
