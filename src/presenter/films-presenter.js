import FilmsSectionView from '../view/films-section-view/films-section-view.js';
import FilmsBlockView from '../view/films-block-view/films-block-view.js';
import FilmsListView from '../view/films-list-view/films-list-view.js';
import FilmCardView from '../view/film-card-view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view/show-more-button-view.js';
// import TopRatedFilmsBlockView from '../view/films-block-view/top-rated-films-block-view.js';
// import CommentedFilmsBlockView from '../view/films-block-view/commented-films-block-view.js';
import {render} from '../render.js';

const MAIN_FILMS_COUNT_TO_SHOW = 5;
// const SECONDARY_FILMS_COUNT_TO_SHOW = 2;

export default class FilmsPresenter {
  #parentElement = null;

  #filmsModel = null;
  #films = null;

  #popupPresenter = null;

  #containerComponent = null;
  #filmsBlockComponent = null;
  #filmsListComponent = null;
  #showMoreButtonComponent = null;

  #filmsCount = null;
  #renderedFilmsCount = null;

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
    this.#filmsCount = this.#films.length;

    this.#renderContainer();

    this.#renderMainBlock();

    // this.#renderBlock({
    //   blockComponent: new TopRatedFilmsBlockView(),
    //   itemsCountToShow: SECONDARY_FILMS_COUNT_TO_SHOW,
    // });

    // this.#renderBlock({
    //   blockComponent: new CommentedFilmsBlockView(),
    //   itemsCountToShow: SECONDARY_FILMS_COUNT_TO_SHOW,
    // });
  }

  #renderContainer() {
    this.#containerComponent = new FilmsSectionView();
    render(this.#containerComponent, this.#parentElement);
  }

  #renderMainBlock() {
    this.#filmsBlockComponent = new FilmsBlockView();

    this.#renderedFilmsCount = MAIN_FILMS_COUNT_TO_SHOW;

    this.#renderBlock({
      blockComponent: this.#filmsBlockComponent,
      itemsCountToShow: this.#renderedFilmsCount,
    });

    if (!this.#isAllFilmsRendered()) {
      this.#renderShowMoreButton();
    }
  }

  #renderBlock({
    blockComponent,
    itemsCountToShow,
  }) {
    this.#filmsListComponent = new FilmsListView();

    render(blockComponent, this.#containerComponent.element);
    render(this.#filmsListComponent, blockComponent.element);

    for (let i = 0; i < Math.min(itemsCountToShow, this.#filmsCount); i++) {
      this.#renderFilm(this.#films[i], this.#filmsListComponent.element);
    }
  }

  #renderFilm(film) {
    const filmCardComponent = new FilmCardView(film);
    filmCardComponent.setCardClick(this.#onFilmCardClick);

    render(filmCardComponent, this.#filmsListComponent.element);
  }

  #onFilmCardClick = (film) => {
    this.#popupPresenter.init(film);
  };

  #renderShowMoreButton() {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setClick(this.#onShowMoreButtonClick);

    render(this.#showMoreButtonComponent, this.#filmsBlockComponent.element);
  }

  #onShowMoreButtonClick = () => {
    const firstIndex = this.#renderedFilmsCount;
    const lastIndex = Math.min(
      this.#renderedFilmsCount + MAIN_FILMS_COUNT_TO_SHOW - 1,
      this.#filmsCount - 1,
    );

    for (let i = firstIndex; i <= lastIndex; i++) {
      this.#renderFilm(this.#films[i], this.#filmsListComponent);
    }

    this.#renderedFilmsCount += MAIN_FILMS_COUNT_TO_SHOW;

    if (this.#isAllFilmsRendered()) {
      this.#showMoreButtonComponent.removeElement();
      this.#showMoreButtonComponent = null;
    }
  };

  #isAllFilmsRendered() {
    return this.#renderedFilmsCount >= this.#filmsCount;
  }
}
