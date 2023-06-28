import FilmsBlockView from './films-block-view.js';
import {FILMS_BLOCK_SECONDARY_CLASS_NAME} from '../../data/constants.js';

export default class TopRatedFilmsBlockView extends FilmsBlockView {
  constructor() {
    super();
    this._setTemplate({
      blockClassName: FILMS_BLOCK_SECONDARY_CLASS_NAME,
      title: 'Top rated',
      isVisibleTitle: true,
    });
  }
}
