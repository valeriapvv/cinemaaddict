import {FilterType} from '../data/constants.js';

const isInWatchlist = (film) => film.userDetails.watchlist;

const isInHistory = (film) => film.userDetails.alreadyWatched;

const isFavorite = (film) => film.userDetails.favorite;

export const filter = {
  [FilterType.All]: (films) => films,
  [FilterType.Watchlist]: (films) => films.filter(isInWatchlist),
  [FilterType.History]: (films) => films.filter(isInHistory),
  [FilterType.Favorites]: (films) => films.filter(isFavorite),
};
