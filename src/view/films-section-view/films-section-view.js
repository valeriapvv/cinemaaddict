import AbstractView from '../../framework/view/abstract-view.js';
import {getFilmsSectionTemplate} from './template.js';

export default class FilmsSectionView extends AbstractView {
  get template() {
    return getFilmsSectionTemplate();
  }
}
