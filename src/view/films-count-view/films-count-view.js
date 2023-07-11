import AbstractView from '../../framework/abstract-view.js';
import {getFilmsCountTemplate} from './template.js';

export default class FilmsCountView extends AbstractView {
  constructor(filmsCount) {
    super();
    this.filmsCount = filmsCount;
  }

  getTemplate() {
    return getFilmsCountTemplate(this.filmsCount);
  }
}
