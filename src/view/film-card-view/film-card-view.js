
import AbstractView from '../../framework/view/abstract-view.js';
import {getFilmCardTemplate, FILM_LINK_CLASS_NAME} from './template.js';

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return getFilmCardTemplate(this.#film);
  }

  setCardClick(onCardClick) {
    const linkElement = this.element.querySelector(`.${FILM_LINK_CLASS_NAME}`);

    linkElement.addEventListener('click', (evt) => {
      evt.preventDefault();

      // TODO: не перерисовываеть попап при клике на ту же карточку

      onCardClick(this.#film);
    });
  }
}
