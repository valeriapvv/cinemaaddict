import FilmsSectionView from '../view/films-section-view/films-section-view.js';
import FilmsBlockView from '../view/films-block-view/films-block-view.js';
import FilmsBlockPresenter from './films-block-presenter.js';
import MainFilmsBlockPresenter from './main-films-block-presenter.js';
import TopRatedFilmsBlockView from '../view/films-block-view/top-rated-films-block-view.js';
import CommentedFilmsBlockView from '../view/films-block-view/commented-films-block-view.js';
import NoFilmsBlockView from '../view/films-block-view/no-films-block-view.js';
import {render} from '../render.js';

const MAIN_FILMS_COUNT_TO_SHOW = 5;
const SECONDARY_FILMS_COUNT_TO_SHOW = 2;

export default class FilmsPresenter {
  #parentElement = null;

  #filmsModel = null;

  #popupPresenter = null;

  #containerComponent = null;

  constructor({
    parentElement,
    filmsModel,
    popupPresenter,
  }) {
    this.#parentElement = parentElement;
    this.#filmsModel = filmsModel;
    this.#popupPresenter = popupPresenter;
  }

  init() {
    this.#renderContainer();

    if (!this.#filmsModel.films.length) {
      this.#renderNoFilmsBlock();
      return;
    }

    this.#initMainFilms();
    this.#initTopRatedFilms();
    this.#initCommentedFilms();
  }

  #renderContainer() {
    this.#containerComponent = new FilmsSectionView();
    render(this.#containerComponent, this.#parentElement);
  }

  #renderNoFilmsBlock() {
    render(new NoFilmsBlockView(), this.#containerComponent.element);
  }

  #initMainFilms() {
    const mainFilmsPresenter = new MainFilmsBlockPresenter({
      parentElement: this.#containerComponent.element,
      filmsModel: this.#filmsModel,
      popupPresenter: this.#popupPresenter,
      blockComponent: new FilmsBlockView(),
      itemsCountToShow: MAIN_FILMS_COUNT_TO_SHOW,
    });
    mainFilmsPresenter.init();
  }

  #initTopRatedFilms() {
    const topRatedFilmsPresenter = new FilmsBlockPresenter({
      parentElement: this.#containerComponent.element,
      filmsModel: this.#filmsModel,
      popupPresenter: this.#popupPresenter,
      blockComponent: new TopRatedFilmsBlockView(),
      itemsCountToShow: SECONDARY_FILMS_COUNT_TO_SHOW,
    });
    topRatedFilmsPresenter.init();
  }

  #initCommentedFilms() {
    const commentedFilmsPresenter = new FilmsBlockPresenter({
      parentElement: this.#containerComponent.element,
      filmsModel: this.#filmsModel,
      popupPresenter: this.#popupPresenter,
      blockComponent: new CommentedFilmsBlockView(),
      itemsCountToShow: SECONDARY_FILMS_COUNT_TO_SHOW,
    });
    commentedFilmsPresenter.init();
  }
}
