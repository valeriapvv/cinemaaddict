import FilmsSectionView from '../view/films-section-view/films-section-view.js';
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
    const filmsSectionComponent = new FilmsSectionView();

    this.filmsPresenter = new FilmsPresenter({
      parentElement: filmsSectionComponent.element,
      filmsModel: this.#filmsModel,
    });
    this.filmsPresenter.init();

    render(filmsSectionComponent, this.#parentElement);
  }
}
