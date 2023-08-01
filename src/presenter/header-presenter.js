import UserProfileView from '../view/user-profile-view/user-profile-view.js';
import {render} from '../render.js';

export default class HeaderPresenter {
  #parentElement = null;

  constructor({parentElement}) {
    this.#parentElement = parentElement;
  }

  init() {
    render(new UserProfileView(), this.#parentElement);
  }
}
