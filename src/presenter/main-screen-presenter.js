import FiltersView from '../view/filters-view/filters-view.js';
import SortView from '../view/sort-view/sort-view.js';
import {render} from '../render.js';

// TODO: Разбить на презентеры фильтров и сортировки
export class MainScreenPresenter {
  #parentElement = null;

  constructor({
    parentElement,
  }) {
    this.#parentElement = parentElement;
  }

  init() {
    this.#renderFilters();
    this.#renderSort();
  }

  #renderFilters() {
    render(new FiltersView(), this.#parentElement);
  }

  #renderSort() {
    render(new SortView(), this.#parentElement);
  }
}
