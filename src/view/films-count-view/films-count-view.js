import AbstractView from '../../framework/abstract-view.js';
import {getFilmsCountTemplate} from './template.js';

export default class FilmsCountView extends AbstractView {
  #filmsCount = null;

  constructor(filmsCount) {
    super();
    this.#filmsCount = filmsCount;
  }

  _getTemplate() {
    return getFilmsCountTemplate(this.#filmsCount);
  }
}
