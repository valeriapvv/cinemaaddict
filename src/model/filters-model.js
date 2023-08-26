import {FilterType} from '../data/constants.js';
import {isFavorite, isInHistory, isInWatchlist} from '../utils.js';

const filter = {
  [FilterType.Watchlist]: (films) => films.filter(isInWatchlist),
  [FilterType.History]: (films) => films.filter(isInHistory),
  [FilterType.Favorites]: (films) => films.filter(isFavorite),
};

export default class FiltersModel {
  #filters = null;

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
}
