import FilmsCountView from '../../view/films-count-view/films-count-view.js';
import {render} from '../../framework/render.js';

export default class FilmsCountPresenter {
  #parentElement = null;
  #filmsModel = null;

  constructor({
    parentElement,
    filmsModel,
  }) {
    this.#parentElement = parentElement;
    this.#filmsModel = filmsModel;
  }

  init() {
    const filmsCount = this.#filmsModel.films.length;
    render(new FilmsCountView(filmsCount), this.#parentElement);
  }
}
