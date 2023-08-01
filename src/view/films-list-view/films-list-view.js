import AbstractView from '../../framework/abstract-view.js';
import {getFilmsListTemplate} from './template.js';

export default class FilmsListView extends AbstractView {
  _getTemplate() {
    return getFilmsListTemplate();
  }
}
