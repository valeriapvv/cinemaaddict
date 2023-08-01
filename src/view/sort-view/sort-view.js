import AbstractView from '../../framework/abstract-view.js';
import {getSortTemplate} from './template.js';

export default class SortView extends AbstractView {
  _getTemplate() {
    return getSortTemplate();
  }
}
