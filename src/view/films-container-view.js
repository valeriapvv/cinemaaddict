import AbstractView from '../framework/abstract-view.js';

const getFilmsContainerTemplate = () => `
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>
`;

export default class FilmsContainerView extends AbstractView {
  getTemplate() {
    return getFilmsContainerTemplate();
  }
}
