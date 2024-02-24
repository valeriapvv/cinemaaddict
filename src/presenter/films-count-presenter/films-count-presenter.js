import FilmsCountView from '../../view/films-count-view/films-count-view.js';
import {render} from '../../framework/render.js';
import {UpdateType} from '../../data/constants.js';

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
    this.#filmsModel.addObserver(this.#handleFilmsModelEvent);
  }

  #handleFilmsModelEvent = (event) => {
    switch(event) {
      case UpdateType.Init:
        this.#renderFilmsCount();
        break;
    }
  };

  #renderFilmsCount() {
    const filmsCount = this.#filmsModel.films.length;
    render(new FilmsCountView(filmsCount), this.#parentElement);
  }
}
