import UserProfileView from '../view/user-profile-view.js';
import {render} from '../render.js';

export default class HeaderPresenter {
  constructor({parentElement}) {
    this.parentElement = parentElement;
  }

  init() {
    this.userProfileComponent = new UserProfileView();
    render(this.userProfileComponent, this.parentElement);
  }
}
