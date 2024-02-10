import {RenderPosition, render, replace} from '../../framework/render.js';
import FiltersView from '../../view/filters-view/filters-view.js';

export default class FiltersPresenter {
  #parentElement = null;
  #filmsModel = null;
  #filtersModel = null;

  #filtersComponent = null;

  constructor({
    parentElement,
    filmsModel,
    filtersModel,
  }) {
    this.#parentElement = parentElement;
    this.#filmsModel = filmsModel;
    this.#filtersModel = filtersModel;
  }

  init() {
    this.#filmsModel.addObserver(this.#handleFilmsModelEvent);
    this.#filtersModel.addObserver(this.#handleFiltersModelEvent);
    this.#initFilters();
  }

  #handleFilmsModelEvent = () => {
    this.#filtersModel.createFilters(this.#filmsModel.films);
    this.#initFilters();
  };

  #handleFiltersModelEvent = () => {
    this.#initFilters();
  };

  #initFilters() {
    const prevComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView(
      this.#filtersModel.filters,
      this.#filtersModel.activeFilter,
    );
    this.#filtersComponent.setFilterChange(this.#onFilterChange);

    if (prevComponent === null) {
      render(this.#filtersComponent, this.#parentElement, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#filtersComponent, prevComponent);
  }

  #onFilterChange = (filterType) => {
    this.#filtersModel.activeFilter = filterType;
  };
}
