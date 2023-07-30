import {createElement} from '../render.js';

export default class AbstractView {
  #element = null;

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can not instantiate abstract class, only concrete one: AbstractView');
    }
  }

  _getTemplate() {
    throw new Error('Abstract method is not implemented: getTemplate');
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this._getTemplate());
    }

    return this.#element;
  }

  removeElement() {
    this.#element.remove();
    this.#element = null;
  }
}
