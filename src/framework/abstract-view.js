import {createElement} from '../render.js';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can not instantiate abstract class, only concrete one: AbstractView');
    }
  }

  getTemplate() {
    throw new Error('Abstract method is not implemented: getTemplate');
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
