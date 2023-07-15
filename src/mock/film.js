import {faker} from '@faker-js/faker';
import {
  getRandomBoolean,
  createUniqueIntegerGenerator,
} from './utils.js';
import {createCommentsIdsGenerator} from './data-generation.js';
import {
  COMMENTS_COUNT,
  FILMS_COUNT,
  FILM_GENRES,
  FILM_MAX_RATING,
  FILM_RATING_PRECISION,
  PosterSize,
  RATING_MAX_AGE,
} from './constants.js';

const {
  number,
  lorem,
  image,
  person,
  date,
  location,
} = faker;

const getFilmId = createUniqueIntegerGenerator(1, FILMS_COUNT);

const getCommentId = createCommentsIdsGenerator();

const generateCommentsIds = () => Array.from({
  length: number.int(COMMENTS_COUNT / FILMS_COUNT),
}, getCommentId);

const generateFilmTitle = () => lorem.sentence({min: 2, max: 7});

const generateRating = () => number.float({
  min: 0,
  max: FILM_MAX_RATING,
  precision: FILM_RATING_PRECISION,
});

const generatePoster = () => image.urlLoremFlickr({
  width: PosterSize.Width,
  height: PosterSize.Height,
});

const generatePersons = () => Array.from({length: number.int(5)}, () => person.fullName());

const generateReleaseDate = () => date.past({years: number.int({min: 1, max: 20})}).toISOString();

const generateRuntime = () => number.int({min: 40, max: 200});

const generateFilmGenres = () => {
  const getIndex = createUniqueIntegerGenerator(0, FILM_GENRES.length - 1);
  const minGenresCount = 1;
  const maxGenresCount = FILM_GENRES.length;

  return Array.from(
    {length: number.int({min: minGenresCount, max: maxGenresCount})},
    () => FILM_GENRES[getIndex()],
  );
};

const generateWatchingDate = (releaseDate) =>
  date.between({
    from: releaseDate,
    to: new Date(),
  }).toISOString();

export const generateFilm = () => {
  const releaseDate = generateReleaseDate();
  const alreadyWatched = getRandomBoolean();
  const watchingDate = alreadyWatched ? generateWatchingDate(releaseDate) : null;

  return {
    id: getFilmId(),
    comments: generateCommentsIds(),
    filmInfo: {
      title: generateFilmTitle(),
      alternativeTitle: generateFilmTitle(),
      totalRating: generateRating(),
      poster: generatePoster(),
      ageRating: number.int(RATING_MAX_AGE),
      director: person.fullName(),
      writers: generatePersons(),
      actors: generatePersons(),
      release: {
        date: releaseDate,
        releaseCountry: location.country(),
      },
      runtime: generateRuntime(),
      genre: generateFilmGenres(),
      description: lorem.sentences(2),
    },
    userDetails: {
      watchlist: getRandomBoolean(),
      alreadyWatched,
      watchingDate,
      favorite: getRandomBoolean(),
    }
  };
};
