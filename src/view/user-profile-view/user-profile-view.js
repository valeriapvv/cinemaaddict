import AbstractView from '../../framework/view/abstract-view.js';
import {getUserProfileTemplate} from './template.js';

export default class UserProfileView extends AbstractView {
  get template() {
    return getUserProfileTemplate();
  }
}
