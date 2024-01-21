import {SortType} from '../data/constants.js';

const byDate = (filmA, filmB) => {
  const dateA = new Date(filmA.filmInfo.release.date);
  const dateB = new Date(filmB.filmInfo.release.date);

  return dateB - dateA;
};

const byRating = (filmA, filmB) => {
  const ratingA = filmA.filmInfo.totalRating;
  const ratingB = filmB.filmInfo.totalRating;

  return ratingB - ratingA;
};

export const sortFilms = {
  [SortType.Default]: (films) => films,
  [SortType.Date]: (films) => films.sort(byDate),
  [SortType.Rating]: (films) => films.sort(byRating),
};
