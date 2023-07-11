import AbstractView from '../../framework/abstract-view.js';
import {getUserProfileTemplate} from './template.js';

export default class UserProfileView extends AbstractView {
  getTemplate() {
    return getUserProfileTemplate();
  }
}
