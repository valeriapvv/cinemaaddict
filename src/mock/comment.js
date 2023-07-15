import {faker} from '@faker-js/faker';
import {createCommentsIdsGenerator} from './data-generation.js';
import {getRandomArrayElement} from './utils.js';
import {EMOTIONS} from '../data/constants.js';

const {
  date,
  number,
  person,
  lorem,
} = faker;

const getCommentId = createCommentsIdsGenerator();

const generateCommentDate = () =>
  date.recent({days: number.int({min: 1, max: 10})}).toISOString();

export const generateComment = () => ({
  id: getCommentId(),
  author: person.fullName(),
  comment: lorem.sentences(2),
  date: generateCommentDate(),
  emotion: getRandomArrayElement(EMOTIONS),
});
