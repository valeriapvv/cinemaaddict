import FiltersView from '../../view/filters-view/filters-view.js';
import SortView from '../../view/sort-view/sort-view.js';
import {render} from '../../framework/render.js';

// TODO: Разбить на презентеры фильтров и сортировки
export class MainScreenPresenter {
  #parentElement = null;

  #filtersModel = null;
  #filters = null;

  constructor({
    parentElement,
    filtersModel,
  }) {
    this.#parentElement = parentElement;
    this.#filtersModel = filtersModel;
  }

  init() {
    this.#filters = this.#filtersModel.filters;

    this.#renderFilters();
    this.#renderSort();
  }

  #renderFilters() {
    render(new FiltersView(this.#filters), this.#parentElement);
  }

  #renderSort() {
    render(new SortView(), this.#parentElement);
  }
}
