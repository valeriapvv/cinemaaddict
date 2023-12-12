import FiltersView from '../../view/filters-view/filters-view.js';
import SortView from '../../view/sort-view/sort-view.js';
import FilmsSectionView from '../../view/films-section-view/films-section-view.js';
import FilmsBlockView from '../../view/films-block-view/films-block-view.js';
import FilmsBlockPresenter from './films-block-presenter.js';
import MainFilmsBlockPresenter from './main-films-block-presenter.js';
import TopRatedFilmsBlockView from '../../view/films-block-view/top-rated-films-block-view.js';
import CommentedFilmsBlockView from '../../view/films-block-view/commented-films-block-view.js';
import NoFilmsBlockView from '../../view/films-block-view/no-films-block-view.js';
import {render, replace} from '../../framework/render.js';
import {SortType} from '../../data/constants.js';

const MAIN_FILMS_COUNT_TO_SHOW = 5;
const SECONDARY_FILMS_COUNT_TO_SHOW = 2;

// TODO: перенести код сортировки в utils

const byDate = (filmA, filmB) => {
  const dateA = new Date(filmA.filmInfo.release.date);
  const dateB = new Date(filmB.filmInfo.release.date);

  return dateB - dateA;
};

const byRating = (filmA, filmB) => {
  const ratingA = filmA.filmInfo.totalRating;
  const ratingB = filmB.filmInfo.totalRating;

  return ratingB - ratingA;
};

const sortFilms = {
  [SortType.Default]: (films) => films,
  [SortType.Date]: (films) => films.sort(byDate),
  [SortType.Rating]: (films) => films.sort(byRating),
};

export default class FilmsPresenter {
  #parentElement = null;

  #filmsModel = null;

  #filtersModel = null;
  #filters = null;

  #sortComponent = null;
  #currentSortType = SortType.Default;

  #mainFilmsPresenter = null;
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

    this.#initSort();

    this.#renderContainer();

    const films = this.#getFilms();

    if (!films.length) {
      this.#renderNoFilmsBlock();
      return;
    }

    this.#initMainFilms(films);
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

  #initMainFilms(films) {
    this.#mainFilmsPresenter = this.#mainFilmsPresenter || new MainFilmsBlockPresenter({
      parentElement: this.#filmsSectionComponent.element,
      filmsModel: this.#filmsModel,
      popupPresenter: this.#popupPresenter,
      blockComponent: new FilmsBlockView(),
      itemsCountToShow: MAIN_FILMS_COUNT_TO_SHOW,
    });

    this.#mainFilmsPresenter.init(films);
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

  #initSort() {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      sortType: SortType,
      currentSortType: this.#currentSortType,
    });
    this.#sortComponent.setChange(this.#onSortChange);

    if (prevSortComponent === null) {
      render(this.#sortComponent, this.#parentElement);
      return;
    }

    replace(this.#sortComponent, prevSortComponent);
  }

  #onSortChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#initSort();

    this.#initMainFilms(this.#getFilms());
  };

  #getFilms() {
    const sourcedFilms = this.#filmsModel.films;

    return sortFilms[this.#currentSortType](sourcedFilms);
  }
}
