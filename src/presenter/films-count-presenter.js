import FilmsCountView from '../view/films-count-view.js';
import {render} from '../render.js';
import {TOTAL_FILMS_COUNT} from '../data/constants.js';

export default class FilmsCountPresenter {
  constructor({parentElement}) {
    this.parentElement = parentElement;
  }

  init() {
    const filmsCountComponent = new FilmsCountView({filmsCount: TOTAL_FILMS_COUNT});
    render(filmsCountComponent, this.parentElement);
  }
}
