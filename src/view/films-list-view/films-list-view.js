import AbstractView from '../../framework/view/abstract-view.js';
import {getFilmsListTemplate} from './template.js';

export default class FilmsListView extends AbstractView {
  _getTemplate() {
    return getFilmsListTemplate();
  }
}
