import AbstractView from '../../framework/view/abstract-view.js';
import {getFilmsCountTemplate} from './template.js';

export default class FilmsCountView extends AbstractView {
  #filmsCount = null;

  constructor(filmsCount) {
    super();
    this.#filmsCount = filmsCount;
  }

  get template() {
    return getFilmsCountTemplate(this.#filmsCount);
  }
}
