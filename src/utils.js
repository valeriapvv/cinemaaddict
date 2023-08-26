// Time

export const formatMinutes = (minutes) => {
  if (minutes < 1) {
    return '';
  }

  const hours = Math.floor(minutes / 60) || '';
  const restMinutes = Math.floor(minutes % 60) || '';

  const hoursSign = hours ? 'h' : '';
  const minutesSign = restMinutes ? 'm' : '';

  return `${hours}${hoursSign} ${restMinutes}${minutesSign}`;
};

// Film
export const isInWatchlist = (film) => film.userDetails.watchlist;

export const isInHistory = (film) => film.userDetails.alreadyWatched;

export const isFavorite = (film) => film.userDetails.favorite;
