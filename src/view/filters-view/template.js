import {FilterType} from '../../data/constants.js';

const FiltersLabel = {
  [FilterType.All]: 'All movies',
  [FilterType.Watchlist]: 'Watchlist',
  [FilterType.History]: 'History',
  [FilterType.Favorites]: 'Favorites',
};

// const ACTIVE_FILTER_CLASS_NAME = 'main-navigation__item--active'

const getFilterItemTemplate = ({name, count}) => `
  <a
    class="main-navigation__item"
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
