import FilmsCountView from '../view/films-count-view.js';
import {render} from '../render.js';

export default class FilmsCountPresenter {
  constructor({
    parentElement,
    filmsModel,
  }) {
    this.parentElement = parentElement;
    this.filmsModel = filmsModel;
  }

  init() {
    const filmsCount = this.filmsModel.getFilms().length;
    render(new FilmsCountView(filmsCount), this.parentElement);
  }
}
