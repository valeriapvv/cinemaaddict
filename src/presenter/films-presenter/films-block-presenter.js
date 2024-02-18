import FilmsListView from '../../view/films-list-view/films-list-view.js';
import FilmCardPresenter from '../film-card-presenter/film-card-presenter.js';
import {render} from '../../framework/render.js';
import {UpdateType} from '../../data/constants.js';

// TODO: Перенести логику изменения данных в модель?

export default class FilmsBlockPresenter {
  #parentElement = null;

  #popupPresenter = null;

  #filmPresenterMap = new Map();

  #isFilmsBlockMounted = false;

  constructor({
    parentElement,
    filmsModel,
    popupPresenter,
    blockComponent,
    itemsCountToShow,
    getFilms,
  }) {
    this.#parentElement = parentElement;
    this._filmsModel = filmsModel;
    this.#popupPresenter = popupPresenter;
    this._blockComponent = blockComponent;
    this._itemsCountToShow = itemsCountToShow;
    this._getFilms = getFilms;
  }

  init() {
    this._filmsModel.addObserver(this.#handleFilmsModelEvent);
    this._initFilmsBlock();
  }

  #handleFilmsModelEvent = (event, updatedFilm) => {
    switch(event) {
      case UpdateType.Init:
        return;

      default:
        this.#updateFilmCard(updatedFilm);
    }
  };

  #updateFilmCard(updatedFilm) {
    const filmCardPresenter = this.#filmPresenterMap.get(updatedFilm.id);

    if (!filmCardPresenter) {
      return;
    }

    filmCardPresenter.init(updatedFilm);
  }

  _initFilmsBlock() {
    if (!this.#isFilmsBlockMounted) {
      this._filmsListComponent = new FilmsListView();

      render(this._blockComponent, this.#parentElement);
      render(this._filmsListComponent, this._blockComponent.element);

      this.#isFilmsBlockMounted = true;
    }

    this.#clearFilms();
    this._renderFilms(0, this._itemsCountToShow);
  }

  #clearFilms() {
    this.#filmPresenterMap
      .forEach((filmPresenter) => filmPresenter.destroy());

    this.#filmPresenterMap.clear();
  }

  _renderFilms(from, to) {
    this._getFilms()
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
    this.#popupPresenter.addEventHandlers({
      onAddToWatchlistClick: this.#onAddToWatchlistClick,
      onAlreadyWatchedClick: this.#onAlreadyWatchedClick,
      onFavoriteClick: this.#onFavoriteClick,
    });
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

    this.#updateFilm(UpdateType.Watchlist, updatedFilm);
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

    this.#updateFilm(UpdateType.History, updatedFilm);
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

    this.#updateFilm(UpdateType.Favorites, updatedFilm);
  };

  #updateFilm(updateType, updatedFilm) {
    this._filmsModel.update(updateType, updatedFilm);
  }
}
