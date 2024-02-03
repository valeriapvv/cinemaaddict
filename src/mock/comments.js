import {faker} from '@faker-js/faker';
import {getRandomArrayElement} from './utils.js';
import {EMOTIONS} from '../data/constants.js';
import {films} from './films.js';

const {
  date,
  number,
  person,
  lorem,
} = faker;

const generateCommentDate = () =>
  date.recent({days: number.int({min: 1, max: 10})}).toISOString();

const generateComment = (id) => ({
  id,
  author: person.fullName(),
  comment: lorem.sentences(2),
  date: generateCommentDate(),
  emotion: getRandomArrayElement(EMOTIONS),
});

const commentsIds = films.reduce((ids, film) => ids.concat(film.comments), []);

export const filmsComments = commentsIds.map(generateComment);
