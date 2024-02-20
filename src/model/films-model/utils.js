import {invertObjectKeys} from '../../utils/common.js';

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

const convertData = (dataToConvert, keyMap) => {
  const callback = (data, [convertedKey, keyToConvert]) => {
    data[convertedKey] = dataToConvert[keyToConvert];
    return data;
  };

  const convertedPart = Object.entries(keyMap)
    .reduce(callback, {});

  const convertedData = {
    ...dataToConvert,
    ...convertedPart,
  };

  for (const keyToConvert of Object.values(keyMap)) {
    delete convertedData[keyToConvert];
  }

  return convertedData;
};

const convertToClient = convertData;

const convertToServer = (clientData, keyMap) => convertData(clientData, invertObjectKeys(keyMap));

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

export const convertFilmToServer = (film) => {
  const convertedFilm = convertToServer(film, filmKey);

  const convertedFilmInfo = convertToServer(convertedFilm[filmKey.filmInfo], filmInfoKey);

  const convertedUserDetails = convertToServer(convertedFilm[filmKey.userDetails], userDetailsKey);

  const convertedRelease = convertToServer(convertedFilmInfo.release, releaseKey);

  return {
    ...convertedFilm,

    [filmKey.filmInfo]: {
      ...convertedFilmInfo,
      release: convertedRelease,
    },

    [filmKey.userDetails]: convertedUserDetails,
  };
};
