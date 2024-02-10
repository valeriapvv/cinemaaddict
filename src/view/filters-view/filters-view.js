import AbstractView from '../../framework/view/abstract-view.js';
import {getFiltersTemplate} from './template.js';

export default class FiltersView extends AbstractView {
  #filters = null;
  #activeFilter = null;

  constructor(filters, activeFilter) {
    super();
    this.#filters = filters;
    this.#activeFilter = activeFilter;
  }

  get template() {
    return getFiltersTemplate(this.#filters, this.#activeFilter);
  }

  setFilterChange(onChange) {
    this._callback.change = onChange;

    this.element.addEventListener('click', this.#onClick);
  }

  #onClick = (evt) => {
    const filterElement = evt.target.closest('[data-filter-type]');

    if (!filterElement) {
      return;
    }

    evt.preventDefault();

    const {filterType} = filterElement.dataset;

    this._callback.change(filterType);
  };
}
