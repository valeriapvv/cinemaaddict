import FiltersView from '../../view/filters-view/filters-view.js';
import SortView from '../../view/sort-view/sort-view.js';
import FilmsSectionView from '../../view/films-section-view/films-section-view.js';
import FilmsBlockView from '../../view/films-block-view/films-block-view.js';
import FilmsBlockPresenter from './films-block-presenter.js';
import MainFilmsBlockPresenter from './main-films-block-presenter.js';
import TopRatedFilmsBlockView from '../../view/films-block-view/top-rated-films-block-view.js';
import CommentedFilmsBlockView from '../../view/films-block-view/commented-films-block-view.js';
import NoFilmsBlockView from '../../view/films-block-view/no-films-block-view.js';
import {render} from '../../framework/render.js';

const MAIN_FILMS_COUNT_TO_SHOW = 5;
const SECONDARY_FILMS_COUNT_TO_SHOW = 2;

export default class FilmsPresenter {
  #parentElement = null;

  #filmsModel = null;

  #filtersModel = null;
  #filters = null;

  #popupPresenter = null;

  #filmsSectionComponent = null;

  constructor({
    parentElement,
    filmsModel,
    filtersModel,
    popupPresenter,
  }) {
    this.#parentElement = parentElement;
    this.#filmsModel = filmsModel;
    this.#filtersModel = filtersModel;
    this.#popupPresenter = popupPresenter;
  }

  init() {
    this.#filters = this.#filtersModel.filters;
    this.#renderFilters();

    this.#renderSort();

    this.#renderContainer();

    if (!this.#filmsModel.films.length) {
      this.#renderNoFilmsBlock();
      return;
    }

    this.#initMainFilms();
    this.#initTopRatedFilms();
    this.#initCommentedFilms();
  }

  // Films Section

  #renderContainer() {
    this.#filmsSectionComponent = new FilmsSectionView();
    render(this.#filmsSectionComponent, this.#parentElement);
  }

  // No Films

  #renderNoFilmsBlock() {
    render(new NoFilmsBlockView(), this.#filmsSectionComponent.element);
  }

  // Main Films

  #initMainFilms() {
    const mainFilmsPresenter = new MainFilmsBlockPresenter({
      parentElement: this.#filmsSectionComponent.element,
      filmsModel: this.#filmsModel,
      popupPresenter: this.#popupPresenter,
      blockComponent: new FilmsBlockView(),
      itemsCountToShow: MAIN_FILMS_COUNT_TO_SHOW,
    });
    mainFilmsPresenter.init();
  }

  // Top Rated Films

  #initTopRatedFilms() {
    const topRatedFilmsPresenter = new FilmsBlockPresenter({
      parentElement: this.#filmsSectionComponent.element,
      filmsModel: this.#filmsModel,
      popupPresenter: this.#popupPresenter,
      blockComponent: new TopRatedFilmsBlockView(),
      itemsCountToShow: SECONDARY_FILMS_COUNT_TO_SHOW,
    });
    topRatedFilmsPresenter.init();
  }

  // Commented Films

  #initCommentedFilms() {
    const commentedFilmsPresenter = new FilmsBlockPresenter({
      parentElement: this.#filmsSectionComponent.element,
      filmsModel: this.#filmsModel,
      popupPresenter: this.#popupPresenter,
      blockComponent: new CommentedFilmsBlockView(),
      itemsCountToShow: SECONDARY_FILMS_COUNT_TO_SHOW,
    });
    commentedFilmsPresenter.init();
  }

  // Filters

  #renderFilters() {
    render(new FiltersView(this.#filters), this.#parentElement);
  }

  // Sort

  #renderSort() {
    render(new SortView(), this.#parentElement);
  }
}
