import FilmsPresenter from './films-presenter.js';
import FiltersView from '../view/filters-view/filters-view.js';
import SortView from '../view/sort-view/sort-view.js';
import {render} from '../render.js';

export default class MainScreenPresenter {
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
    this.#renderFilters();
    this.#renderSort();
    this.#renderFilmsSection();
  }

  #renderFilters() {
    render(new FiltersView(), this.#parentElement);
  }

  #renderSort() {
    render(new SortView(), this.#parentElement);
  }

  #renderFilmsSection() {
    this.filmsPresenter = new FilmsPresenter({
      parentElement: this.#parentElement,
      filmsModel: this.#filmsModel,
    });
    this.filmsPresenter.init();
  }
}
