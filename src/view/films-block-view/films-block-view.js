import AbstractView from '../../framework/abstract-view.js';
import {getFilmsBlockTemplate} from './template.js';

const DEFAULT_TITLE = 'All movies. Upcoming';

export default class FilmsBlockView extends AbstractView {
  getTemplate() {
    if (!this._template) {
      this._setTemplate();
    }

    return this._template;
  }

  _setTemplate({
    blockClassName,
    title = DEFAULT_TITLE,
    isVisibleTitle,
  } = {}) {
    this._template = getFilmsBlockTemplate({
      blockClassName,
      title,
      isVisibleTitle,
    });
  }
}
