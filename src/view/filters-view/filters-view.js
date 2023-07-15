import AbstractView from '../../framework/abstract-view.js';
import {getFiltersTemplate} from './template.js';

export default class FiltersView extends AbstractView {
  getTemplate() {
    return getFiltersTemplate();
  }
}
