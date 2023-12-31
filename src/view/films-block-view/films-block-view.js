import AbstractView from '../../framework/view/abstract-view.js';
import {getFilmsBlockTemplate} from './template.js';

const DEFAULT_TITLE = 'All movies. Upcoming';

export default class FilmsBlockView extends AbstractView {
  #template = null;

  get template() {
    if (!this.#template) {
      this._setTemplate();
    }

    return this.#template;
  }

  _setTemplate({
    blockClassName,
    title = DEFAULT_TITLE,
    isVisibleTitle,
  } = {}) {
    this.#template = getFilmsBlockTemplate({
      blockClassName,
      title,
      isVisibleTitle,
    });
  }
}
