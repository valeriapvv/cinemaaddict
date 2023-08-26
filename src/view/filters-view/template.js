import {FilterType} from '../../data/constants.js';

// TODO: Фильтр 'All movies' без количества фильмов

const FiltersLabel = {
  [FilterType.All]: 'All movies',
  [FilterType.Watchlist]: 'Watchlist',
  [FilterType.History]: 'History',
  [FilterType.Favorites]: 'Favorites',
};

const ACTIVE_FILTER_CLASS_NAME = 'main-navigation__item--active';

const getFilterItemTemplate = ({name, count, isActive}) => `
  <a
    class="main-navigation__item ${isActive ? ACTIVE_FILTER_CLASS_NAME : ''}"
    href="#${name}"
  >
    ${FiltersLabel[name]} <span class="main-navigation__item-count">${count}</span>
  </a>
`;

export const getFiltersTemplate = (filters) => `
  <nav class="main-navigation">
    ${filters.map(getFilterItemTemplate).join('')}
  </nav>
`;
