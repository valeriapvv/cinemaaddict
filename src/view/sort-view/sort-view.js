import AbstractView from '../../framework/view/abstract-view.js';
import {getSortTemplate} from './template.js';

export default class SortView extends AbstractView {
  get template() {
    return getSortTemplate();
  }
}
