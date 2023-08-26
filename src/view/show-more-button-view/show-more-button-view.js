import AbstractView from '../../framework/view/abstract-view.js';
import {getShowMoreButtonTemplate} from './template.js';

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return getShowMoreButtonTemplate();
  }

  setClick(onClick) {
    this._callback.click = onClick;
    this.element.addEventListener('click', this.#onClick);
  }

  #onClick = () => {
    this._callback.click();
  };
}
