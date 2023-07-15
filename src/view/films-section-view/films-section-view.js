import AbstractView from '../../framework/abstract-view.js';
import {getFilmsSectionTemplate} from './template.js';

export default class FilmsSectionView extends AbstractView {
  getTemplate() {
    return getFilmsSectionTemplate();
  }
}
