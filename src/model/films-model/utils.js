const filmKey = {
  filmInfo: 'film_info',
  userDetails: 'user_details',
};

const filmInfoKey = {
  alternativeTitle: 'alternative_title',
  totalRating: 'total_rating',
  ageRating: 'age_rating',
};

const userDetailsKey = {
  alreadyWatched: 'already_watched',
  watchingDate: 'watching_date',
};

const releaseKey = {
  releaseCountry: 'release_country',
};

const convertToClient = (serverData, keyMap) => {
  const callback = (data, [clientKey, serverKey]) => {
    data[clientKey] = serverData[serverKey];
    return data;
  };

  const convertedPart = Object.entries(keyMap)
    .reduce(callback, {});

  const clientData = {
    ...serverData,
    ...convertedPart,
  };

  for (const serverKey of Object.values(keyMap)) {
    delete clientData[serverKey];
  }

  return clientData;
};

export const convertFilmToClient = (film) => {
  const convertedFilm = convertToClient(film, filmKey);

  const convertedFilmInfo = convertToClient(convertedFilm.filmInfo, filmInfoKey);

  const convertedUserDetails = convertToClient(convertedFilm.userDetails, userDetailsKey);

  const convertedRelease = convertToClient(convertedFilmInfo.release, releaseKey);

  return {
    ...convertedFilm,
    filmInfo: {
      ...convertedFilmInfo,
      release: convertedRelease,
    },
    userDetails: convertedUserDetails,
  };

};
