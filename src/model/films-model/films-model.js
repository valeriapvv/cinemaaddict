import Observable from '../../framework/observable.js';
import {convertFilmToClient} from './utils.js';

export default class FilmsModel extends Observable {
  #films = null;
  #api = null;

  constructor({
    api,
  }) {
    super();
    this.#api = api;
  }

  async init(event) {
    try {
      const films = await this.#api.getFilms();
      this.#films = films.map(convertFilmToClient);
    } catch (err) {
      this.#films = [];
      throw err;
    } finally {
      this._notify(event, null);
      console.log('Client Data', this.#films);
    }
  }

  get films() {
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
