import HeaderPresenter from './presenter/header-presenter.js';
import MainScreenPresenter from './presenter/main-screen-presenter.js';
import FilmsCountPresenter from './presenter/films-count-presenter.js';
import PopupPresesnter from './presenter/popup-presenter.js';
import {ElementSelector} from './data/constants.js';
import {generateFilm} from './mock/film.js';
import {FILMS_COUNT} from './mock/constants.js';

// eslint-disable-next-line no-console
console.log(Array.from({length: FILMS_COUNT}, generateFilm));

const rootElement = document.body;

const headerPresenter = new HeaderPresenter({
  parentElement: document.querySelector(ElementSelector.Header)
});
headerPresenter.init();

const mainScreenPresenter = new MainScreenPresenter({
  parentElement: document.querySelector(ElementSelector.MainScreen)
});
mainScreenPresenter.init();

const filmsCountPresenter = new FilmsCountPresenter({
  parentElement: document.querySelector(ElementSelector.FooterInfo)
});
filmsCountPresenter.init();

const showPopup = () => {
  rootElement.classList.add('hide-overflow');
};

const popupPresenter = new PopupPresesnter({
  parentElement: rootElement,
  showPopup,
});
popupPresenter.init();
