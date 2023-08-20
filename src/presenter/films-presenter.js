import FilmsSectionView from '../view/films-section-view/films-section-view.js';
import FilmsBlockView from '../view/films-block-view/films-block-view.js';
import FilmsListView from '../view/films-list-view/films-list-view.js';
import FilmCardView from '../view/film-card-view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view/show-more-button-view.js';
import TopRatedFilmsBlockView from '../view/films-block-view/top-rated-films-block-view.js';
import CommentedFilmsBlockView from '../view/films-block-view/commented-films-block-view.js';
import {render} from '../render.js';

const MAIN_FILMS_COUNT_TO_SHOW = 5;
const SECONDARY_FILMS_COUNT_TO_SHOW = 2;

export default class FilmsPresenter {
  #parentElement = null;

  #filmsModel = null;
  #films = null;

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
    this.#films = this.#filmsModel.films;

    this.#renderContainer();

    this.#renderMainBlock();

    this.#renderBlock({
      blockComponent: new TopRatedFilmsBlockView(),
      itemsCountToShow: SECONDARY_FILMS_COUNT_TO_SHOW,
    });

    this.#renderBlock({
      blockComponent: new CommentedFilmsBlockView(),
      itemsCountToShow: SECONDARY_FILMS_COUNT_TO_SHOW,
    });
  }

  #renderContainer() {
    this.#containerComponent = new FilmsSectionView();
    render(this.#containerComponent, this.#parentElement);
  }

  #renderMainBlock() {
    const blockComponent = new FilmsBlockView();

    this.#renderBlock({
      blockComponent,
      itemsCountToShow: MAIN_FILMS_COUNT_TO_SHOW,
    });

    this.#renderShowMoreButton(blockComponent.element);
  }

  #renderBlock({
    blockComponent,
    itemsCountToShow,
  }) {
    const filmsListComponent = new FilmsListView();

    render(blockComponent, this.#containerComponent.element);
    render(filmsListComponent, blockComponent.element);

    for (let i = 0; i < Math.min(itemsCountToShow, this.#films.length); i++) {
      this.#renderFilm(this.#films[i], filmsListComponent.element);
    }
  }

  #renderFilm(film, container) {
    const filmCardComponent = new FilmCardView(film);
    filmCardComponent.setCardClick(this.#onFilmCardClick);

    render(filmCardComponent, container);
  }

  #onFilmCardClick = (film) => {
    this.#popupPresenter.init(film);
  };

  #renderShowMoreButton(parentElement) {
    const button = new ShowMoreButtonView();
    button.setClick(this.#onShowMoreButtonClick);

    render(button, parentElement);
  }

  #onShowMoreButtonClick = () => {

  };
}
