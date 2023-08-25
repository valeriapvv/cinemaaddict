import AbstractView from '../../framework/view/abstract-view.js';
import {getFiltersTemplate} from './template.js';

export default class FiltersView extends AbstractView {
  get template() {
    return getFiltersTemplate();
  }
}
