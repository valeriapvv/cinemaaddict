import AbstractView from '../../framework/abstract-view.js';
import {getFilmCardTemplate} from './template.js';

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  _getTemplate() {
    return getFilmCardTemplate(this.#film);
  }
}
