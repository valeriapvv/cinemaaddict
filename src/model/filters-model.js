import {FilterType} from '../data/constants.js';
import Observable from '../framework/observable.js';
import {filter} from '../utils/filter.js';


export default class FiltersModel extends Observable {
  #filters = null;

  #activeFilter = FilterType.All;

  createFilters(films) {
    this.#filters = Object.values(FilterType)
      .map((type) => ({
        name: type,
        count: filter[type](films).length,
      }));
  }

  get filters() {
    return this.#filters;
  }

  set activeFilter(filterType) {
    if (!Object.values(FilterType).includes(filterType)) {
      throw new Error('Invalid filter type');
    }

    this.#activeFilter = filterType;
    this._notify();
  }

  get activeFilter() {
    return this.#activeFilter;
  }
}
