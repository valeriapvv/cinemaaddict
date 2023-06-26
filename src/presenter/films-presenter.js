import FilmsSectionView from '../view/films-section-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';

const FILMS_COUNT = 5;

export default class FilmsPresenter {
  constructor({parentElement}) {
    this.parentElement = parentElement;
  }

  init() {
    this.filmsSectionComponent = new FilmsSectionView();
    this.filmsContainerComponent = new FilmsContainerView();
    this.filmsListComponent = new FilmsListView();
    this.showMoreButtonComponent = new ShowMoreButtonView();

    render(this.filmsContainerComponent, this.filmsSectionComponent.getElement());
    render(this.filmsListComponent, this.filmsContainerComponent.getElement());
    render(this.showMoreButtonComponent, this.filmsContainerComponent.getElement());

    for (let i = 0; i < FILMS_COUNT; i++) {
      render(new FilmCardView(), this.filmsListComponent.getElement());
    }

    render(this.filmsSectionComponent, this.parentElement);
  }
}
