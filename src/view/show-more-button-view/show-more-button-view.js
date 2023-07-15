import AbstractView from '../../framework/abstract-view.js';
import {getShowMoreButtonTemplate} from './template.js';

export default class ShowMoreButtonView extends AbstractView {
  getTemplate() {
    return getShowMoreButtonTemplate();
  }
}
