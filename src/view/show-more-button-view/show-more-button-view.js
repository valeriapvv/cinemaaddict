import AbstractView from '../../framework/view/abstract-view.js';
import {getShowMoreButtonTemplate} from './template.js';

export default class ShowMoreButtonView extends AbstractView {
  _getTemplate() {
    return getShowMoreButtonTemplate();
  }

  setClick(onClick) {
    this.element.addEventListener('click', onClick);
  }
}
