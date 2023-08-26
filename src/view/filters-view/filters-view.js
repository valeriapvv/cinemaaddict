import AbstractView from '../../framework/view/abstract-view.js';
import {getFiltersTemplate} from './template.js';

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return getFiltersTemplate(this.#filters);
  }
}
