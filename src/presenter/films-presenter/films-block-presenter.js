import FilmsListView from '../../view/films-list-view/films-list-view.js';
import FilmCardPresenter from '../film-card-presenter/film-card-presenter.js';
import {render} from '../../framework/render.js';

export default class FilmsBlockPresenter {
  #parentElement = null;

  #popupPresenter = null;

  #filmPresenterMap = new Map();

  constructor({
    parentElement,
    filmsModel,
    popupPresenter,
    blockComponent,
    itemsCountToShow,
  }) {
    this.#parentElement = parentElement;
    this._filmsModel = filmsModel;
    this.#popupPresenter = popupPresenter;
    this._blockComponent = blockComponent;
    this._itemsCountToShow = itemsCountToShow;
  }

  init() {
    this._films = this._filmsModel.films;
    this._filmsCount = this._films.length;
    this._filmsListComponent = new FilmsListView();

    render(this._blockComponent, this.#parentElement);
    render(this._filmsListComponent, this._blockComponent.element);

    this._renderFilms(0, this._itemsCountToShow);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach(this.#renderFilm);
  }

  #renderFilm = (film) => {
    const filmCardPresenter = new FilmCardPresenter({
      parentElement: this._filmsListComponent.element,
      onCardClick: this.#onFilmCardClick,
    });
    filmCardPresenter.init(film);

    this.#filmPresenterMap.set(film.id, filmCardPresenter);
  };

  #onFilmCardClick = (film) => {
    this.#popupPresenter.init(film);
  };
}
