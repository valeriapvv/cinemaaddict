import {FilterType} from '../data/constants.js';
import {isFavorite, isInHistory, isInWatchlist} from '../utils.js';

const filter = {
  [FilterType.All]: (films) => films,
  [FilterType.Watchlist]: (films) => films.filter(isInWatchlist),
  [FilterType.History]: (films) => films.filter(isInHistory),
  [FilterType.Favorites]: (films) => films.filter(isFavorite),
};

export default class FiltersModel {
  #filters = null;

  #activeFilter = FilterType.All;

  createFilters(films) {
    this.#filters = Object.values(FilterType)
      .map((type) => ({
        name: type,
        count: filter[type](films).length,
        isActive: type === this.#activeFilter,
      }));
  }

  get filters() {
    return this.#filters;
  }

  set activeFilter(filterType) {
    if (!FilterType[filterType]) {
      throw new Error('Invalid filter type');
    }

    this.#activeFilter = filterType;
  }

  get activeFilter() {
    return this.#activeFilter;
  }
}
