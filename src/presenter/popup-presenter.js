import PopupView from '../view/popup-view.js';
import {render} from '../render.js';

export default class PopupPresesnter {
  constructor({
    parentElement,
    showPopup,
  }) {
    this.parentElement = parentElement;
    this.showPopup = showPopup;
  }

  init() {
    render(new PopupView(), this.parentElement);
    this.showPopup();
  }
}
