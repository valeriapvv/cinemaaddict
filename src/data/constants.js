export const ContainerSelector = {
  Header: '.header',
  MainScreen: '.main',
  FooterInfo: '.footer__statistics',
};

const FilmDetail = {
  Watchlist: 'watchlist',
  History: 'history',
  Favorites: 'favorites',
};

export const FilterType = {
  All: 'all',
  ...FilmDetail,
};

export const SortType = {
  Default: 'default',
  Date: 'date',
  Rating: 'rating',
};

export const UpdateType = {
  ...FilmDetail,
  CommentDelete: 'commentDelete',
  CommentAdd: 'commentAdd',
};

export const HIDE_OVERFLOW_CLASS_NAME = 'hide-overflow';

export const FILMS_BLOCK_SECONDARY_CLASS_NAME = 'films-list--extra';

export const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
