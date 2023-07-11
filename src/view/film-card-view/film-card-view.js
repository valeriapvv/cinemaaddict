import AbstractView from '../../framework/abstract-view.js';
import {getFilmCardTemplate} from './template.js';

export default class FilmCardView extends AbstractView {
  constructor(film) {
    super();
    this.film = film;
  }

  getTemplate() {
    return getFilmCardTemplate(this.film);
  }
}
