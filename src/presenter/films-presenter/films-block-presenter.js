import FilmsListView from '../../view/films-list-view/films-list-view.js';
import FilmCardPresenter from '../film-card-presenter/film-card-presenter.js';
import {render} from '../../framework/render.js';

// TODO: Перенести логику изменения данных в модель?

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
      onAddToWatchlistClick: this.#onAddToWatchlistClick,
      onAlreadyWatchedClick: this.#onAlreadyWatchedClick,
      onFavoriteClick: this.#onFavoriteClick,
    });
    filmCardPresenter.init(film);

    this.#filmPresenterMap.set(film.id, filmCardPresenter);
  };

  #onFilmCardClick = (film) => {
    this.#popupPresenter.init(film);
  };

  #onAddToWatchlistClick = (film) => {
    const {userDetails} = film;
    const {watchlist} = userDetails;

    const updatedFilm = {
      ...film,
      userDetails: {
        ...userDetails,
        watchlist: !watchlist,
      },
    };

    this.#updateFilm(updatedFilm);
  };

  #onAlreadyWatchedClick = (film) => {
    const {userDetails} = film;
    const alreadyWatched = !userDetails.alreadyWatched;
    const watchingDate = alreadyWatched ? new Date().toISOString() : null;

    const updatedFilm = {
      ...film,
      userDetails: {
        ...userDetails,
        alreadyWatched,
        watchingDate,
      },
    };

    this.#updateFilm(updatedFilm);
  };

  #onFavoriteClick = (film) => {
    const {userDetails} = film;
    const {favorite} = userDetails;

    const updatedFilm = {
      ...film,
      userDetails: {
        ...userDetails,
        favorite: !favorite,
      },
    };

    this.#updateFilm(updatedFilm);
  };

  #updateFilm(updatedFilm) {
    this._filmsModel.update(updatedFilm);
    this._films = this._filmsModel.films;

    this.#redrawFilmCard(updatedFilm);
  }

  #redrawFilmCard = (film) => {
    const filmCardPresenter = this.#filmPresenterMap.get(film.id);
    filmCardPresenter.init(film);
  };
}
