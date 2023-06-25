import UserProfileView from '../view/user-profile-view.js';
import {render} from '../render.js';

export default class HeaderPresenter {
  constructor({headerElement}) {
    this.headerElement = headerElement;
  }

  init() {
    this.userProfileComponent = new UserProfileView();
    render(this.userProfileComponent, this.headerElement);
  }
}
