import AbstractView from '../../framework/abstract-view.js';
import {getFilmCardTemplate, FILM_LINK_CLASS_NAME} from './template.js';

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  _getTemplate() {
    return getFilmCardTemplate(this.#film);
  }

  setCardClick(onCardClick) {
    const linkElement = this.element.querySelector(`.${FILM_LINK_CLASS_NAME}`);

    linkElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      onCardClick(this.#film);
    });
  }
}
