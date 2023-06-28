import FilmsSectionView from '../view/films-section-view.js';
import FilmsPresenter from './films-presenter.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class MainScreenPresenter {
  constructor({parentElement}) {
    this.parentElement = parentElement;
  }

  init() {
    this.renderFilters();
    this.renderSort();
    this.renderFilmsSection();
  }

  renderFilters() {
    render(new FiltersView(), this.parentElement);
  }

  renderSort() {
    render(new SortView(), this.parentElement);
  }

  renderFilmsSection() {
    this.filmsSectionComponent = new FilmsSectionView();

    this.filmsPresenter = new FilmsPresenter({
      parentElement: this.filmsSectionComponent.getElement()
    });
    this.filmsPresenter.init();

    render(this.filmsSectionComponent, this.parentElement);
  }
}
