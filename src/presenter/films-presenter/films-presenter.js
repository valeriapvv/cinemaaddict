import SortView from '../../view/sort-view/sort-view.js';
import FilmsSectionView from '../../view/films-section-view/films-section-view.js';
import FilmsBlockView from '../../view/films-block-view/films-block-view.js';
import FilmsBlockPresenter from './films-block-presenter.js';
import MainFilmsBlockPresenter from './main-films-block-presenter.js';
import TopRatedFilmsBlockView from '../../view/films-block-view/top-rated-films-block-view.js';
import CommentedFilmsBlockView from '../../view/films-block-view/commented-films-block-view.js';
import NoFilmsBlockView from '../../view/films-block-view/no-films-block-view.js';
import {remove, render, replace} from '../../framework/render.js';
import {SortType, UpdateType} from '../../data/constants.js';
import {sortFilms} from '../../utils/sort.js';
import {filter} from '../../utils/filter.js';
import LoadingView from '../../view/loading-view/loading-view.js';

const MAIN_FILMS_COUNT_TO_SHOW = 5;
const SECONDARY_FILMS_COUNT_TO_SHOW = 2;

export default class FilmsPresenter {
  #parentElement = null;

  #filmsModel = null;
  #filtersModel = null;

  #loadingComponent = null;
  #noFilmsComponent = null;
  #filmsSectionComponent = null;
  #sortComponent = null;
  #currentSortType = SortType.Default;

  #mainFilmsPresenter = null;
  #topRatedFilmsPresenter = null;
  #commentedFilmsPresenter = null;
  #popupPresenter = null;

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
    this.#renderLoading();

    this.#filmsModel.addObserver(this.#handleFilmsModelEvent);
    this.#filmsModel.init(UpdateType.Init);
  }

  #handleFilmsModelEvent = (event) => {
    this.#clearScreen();

    switch(event) {
      case UpdateType.Init:
        this.#initSort();
        this.#initFilms();
        break;
    }
  };

  #renderLoading() {
    this.#loadingComponent = new LoadingView();
    render(this.#loadingComponent, this.#parentElement);
  }

  #clearScreen() {
    remove(this.#loadingComponent);
    this.#loadingComponent = null;
  }

  #initFilms = () => {
    if (this.#filmsSectionComponent === null) {
      this.#renderContainer();
    }

    if (!this.#getFilms().length) {
      this.#renderNoFilmsBlock();
      return;
    }

    this.#initMainFilms();
    this.#initTopRatedFilms();
    this.#initCommentedFilms();
  };

  // Sort

  #initSort() {
    // TODO: убрать реинициализацию?
    const prevComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      sortType: SortType,
      currentSortType: this.#currentSortType,
    });
    this.#sortComponent.setChange(this.#onSortChange);

    if (prevComponent === null) {
      render(this.#sortComponent, this.#parentElement);
      return;
    }

    replace(this.#sortComponent, prevComponent);
  }

  #onSortChange = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#initSort();

    this.#initMainFilms();
  };

  // Films Section

  #renderContainer() {
    this.#filmsSectionComponent = new FilmsSectionView();
    render(this.#filmsSectionComponent, this.#parentElement);
  }

  // No Films

  #renderNoFilmsBlock() {
    this.#noFilmsComponent = new NoFilmsBlockView();
    render(this.#noFilmsComponent, this.#filmsSectionComponent.element);
  }

  // Main Films

  #initMainFilms() {
    this.#mainFilmsPresenter = this.#mainFilmsPresenter || new MainFilmsBlockPresenter({
      parentElement: this.#filmsSectionComponent.element,
      filmsModel: this.#filmsModel,
      filtersModel: this.#filtersModel,
      popupPresenter: this.#popupPresenter,
      blockComponent: new FilmsBlockView(),
      itemsCountToShow: MAIN_FILMS_COUNT_TO_SHOW,
      getFilms: this.#getFilms,
      onFilterModelEvent: this.#onFilterModelEvent,
    });

    this.#mainFilmsPresenter.init();
  }

  // Top Rated Films

  #initTopRatedFilms() {
    this.#topRatedFilmsPresenter = this.#topRatedFilmsPresenter || new FilmsBlockPresenter({
      parentElement: this.#filmsSectionComponent.element,
      filmsModel: this.#filmsModel,
      popupPresenter: this.#popupPresenter,
      blockComponent: new TopRatedFilmsBlockView(),
      itemsCountToShow: SECONDARY_FILMS_COUNT_TO_SHOW,
      getFilms: this.#getFilms,
    });
    this.#topRatedFilmsPresenter.init();
  }

  // Commented Films

  #initCommentedFilms() {
    this.#commentedFilmsPresenter = this.#commentedFilmsPresenter || new FilmsBlockPresenter({
      parentElement: this.#filmsSectionComponent.element,
      filmsModel: this.#filmsModel,
      popupPresenter: this.#popupPresenter,
      blockComponent: new CommentedFilmsBlockView(),
      itemsCountToShow: SECONDARY_FILMS_COUNT_TO_SHOW,
      getFilms: this.#getFilms,
    });
    this.#commentedFilmsPresenter.init();
  }

  // On Filter Change
  #onFilterModelEvent = () => {
    this.#currentSortType = SortType.Default;
    this.#initSort();
  };

  // Get Films

  // FIXME: Большое количество повторных фильтраций/сортировок
  // при вызове #getFilms в других презенторах
  #getFilms = () => {
    const films = this.#filmsModel.films;

    const currentFilter = this.#filtersModel.activeFilter;
    const filteredFilms = filter[currentFilter](films);

    return sortFilms[this.#currentSortType](filteredFilms);
  };
}
