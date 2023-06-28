import AbstractView from '../framework/abstract-view.js';

const getFilmsCountTemplate = (filmsCount) => `<p>${filmsCount} movies inside</p>`;

export default class FilmsCountView extends AbstractView {
  constructor({filmsCount}) {
    super();
    this.filmsCount = filmsCount;
  }

  getTemplate() {
    return getFilmsCountTemplate(this.filmsCount);
  }
}
