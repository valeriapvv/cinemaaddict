import FilmsListView from '../view/films-list-view/films-list-view.js';
import FilmCardView from '../view/film-card-view/film-card-view.js';
import {render} from '../render.js';

export default class FilmsBlockPresenter {
  #parentElement = null;

  #popupPresenter = null;

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

    for (let i = 0; i < Math.min(this._itemsCountToShow, this._filmsCount); i++) {
      this._renderFilm(this._films[i], this._filmsListComponent.element);
    }
  }

  _renderFilm(film) {
    const filmCardComponent = new FilmCardView(film);
    filmCardComponent.setCardClick(this.#onFilmCardClick);

    render(filmCardComponent, this._filmsListComponent.element);
  }

  #onFilmCardClick = (film) => {
    this.#popupPresenter.init(film);
  };
}
