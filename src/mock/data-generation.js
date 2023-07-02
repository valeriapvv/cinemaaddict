import {createUniqueIntegerGenerator} from './utils.js';
import {COMMENTS_COUNT} from './constants.js';

export const createCommentsIdsGenerator = () => createUniqueIntegerGenerator(1, COMMENTS_COUNT);

