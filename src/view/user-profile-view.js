import AbstractView from '../framework/abstract-view.js';

const getUserProfileTemplate = () => `
  <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
`;

export default class UserProfileView extends AbstractView {
  getTemplate() {
    return getUserProfileTemplate();
  }
}