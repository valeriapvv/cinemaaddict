import AbstractView from '../framework/abstract-view.js';

const getFilmsListTemplate = () => '<div class="films-list__container"></div>';

export default class FilmsListView extends AbstractView {
  getTemplate() {
    return getFilmsListTemplate();
  }
}
