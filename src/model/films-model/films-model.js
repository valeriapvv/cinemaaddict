import Observable from '../../framework/observable.js';
import {convertFilmToClient, convertFilmToServer} from './utils.js';

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
    }
  }

  get films() {
    return [...this.#films];
  }

  async updateFilm(event, update) {
    const prevFilms = this.#films;
    const index = prevFilms.findIndex(({id}) => id === update.id);

    const film = await this.#api.updateFilm(
      convertFilmToServer(update)
    );

    const updatedFilm = convertFilmToClient(film);

    this.#films = [
      ...prevFilms.slice(0, index),
      updatedFilm,
      ...prevFilms.slice(index + 1),
    ];

    this._notify(event, updatedFilm);
  }

  updateComments(event, filmId, comments) {
    const film = this.#films.find(({id}) => id === filmId);
    film.comments = comments.map(({id}) => id);

    this._notify(event, film);
  }
}
