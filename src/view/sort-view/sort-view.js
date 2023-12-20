import AbstractView from '../../framework/view/abstract-view.js';
import {getSortTemplate} from './template.js';

export default class SortView extends AbstractView {
  #sortType = null;
  #currentSortType = null;

  constructor({
    sortType,
    currentSortType,
  }) {
    super();
    this.#sortType = sortType;
    this.#currentSortType = currentSortType;
  }

  get template() {
    return getSortTemplate(this.#sortType, this.#currentSortType);
  }

  setChange(onClick) {
    this._callback.click = onClick;

    this.element.addEventListener('click', this.#onClick);
  }

  #onClick = (evt) => {
    const sortElement = evt.target.closest('[data-sort-type]');

    if (!sortElement) {
      return;
    }

    evt.preventDefault();
    this._callback.click(sortElement.dataset.sortType);
  };
}
