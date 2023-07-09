import FilmsBlockView from '../view/films-block-view/films-block-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import TopRatedFilmsBlockView from '../view/films-block-view/top-rated-films-block-view.js';
import CommentedFilmsBlockView from '../view/films-block-view/commented-films-block-view.js';
import {render} from '../render.js';

const MAIN_FILMS_COUNT = 10;
const SECONDARY_FILMS_COUNT = 2;

export default class FilmsPresenter {
  constructor({
    parentElement,
    filmsModel,
  }) {
    this.parentElement = parentElement;
    this.filmsModel = filmsModel;
  }

  init() {
    this.films = [...this.filmsModel.getFilms()];
    const filmsCount = this.films.length;

    this.renderBlock({
      blockComponent: new FilmsBlockView(),
      itemsCount: Math.min(MAIN_FILMS_COUNT, filmsCount),
    });

    this.renderBlock({
      blockComponent: new TopRatedFilmsBlockView(),
      itemsCount: Math.min(SECONDARY_FILMS_COUNT, filmsCount),
      hasShowMoreButton: false,
    });

    this.renderBlock({
      blockComponent: new CommentedFilmsBlockView(),
      itemsCount: Math.min(SECONDARY_FILMS_COUNT, filmsCount),
      hasShowMoreButton: false,
    });
  }

  renderBlock({
    blockComponent,
    itemsCount,
    hasShowMoreButton = true,
  }) {
    const blockElement = blockComponent.getElement();
    const filmsListComponent = new FilmsListView();

    render(blockComponent, this.parentElement);
    render(filmsListComponent, blockElement);

    if (hasShowMoreButton) {
      render(new ShowMoreButtonView(), blockElement);
    }

    for (let i = 0; i < itemsCount; i++) {
      const film = this.films[i];
      render(new FilmCardView(film), filmsListComponent.getElement());
    }
  }
}
