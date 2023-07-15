import AbstractView from '../../framework/abstract-view.js';
import {getPopupTemplate} from './template.js';

export default class PopupView extends AbstractView {
  constructor(film, comments) {
    super();
    this.film = film;
    this.comments = comments;
  }

  getTemplate() {
    return getPopupTemplate(this.film, this.comments);
  }
}
