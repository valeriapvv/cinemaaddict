import AbstractView from '../../framework/abstract-view.js';
import {getPopupTemplate} from './template.js';

export default class PopupView extends AbstractView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  _getTemplate() {
    return getPopupTemplate(this.#film, this.#comments);
  }
}
