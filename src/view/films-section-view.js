import AbstractView from '../framework/abstract-view.js';

const getFilmsSectionTemplate = () => '<section class="films"></section>';

export default class FilmsSectionView extends AbstractView {
  getTemplate() {
    return getFilmsSectionTemplate();
  }
}
