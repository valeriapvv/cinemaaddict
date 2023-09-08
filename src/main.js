import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FiltersModel from './model/filters-model.js';
import HeaderPresenter from './presenter/header-presenter/header-presenter.js';
import FilmsPresenter from './presenter/films-presenter/films-presenter.js';
import {MainScreenPresenter} from './presenter/main-screen-persenter/main-screen-presenter.js';
import FilmsCountPresenter from './presenter/films-count-presenter/films-count-presenter.js';
import PopupPresenter from './presenter/popup-presenter/popup-presenter.js';
import {ContainerSelector, HIDE_OVERFLOW_CLASS_NAME} from './data/constants.js';

const rootElement = document.body;
const mainContainer = document.querySelector(ContainerSelector.MainScreen);

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

// eslint-disable-next-line no-unused-vars
const filtersModel = new FiltersModel();
filtersModel.createFilters(filmsModel.films);

const headerPresenter = new HeaderPresenter({
  parentElement: document.querySelector(ContainerSelector.Header)
});
headerPresenter.init();

const onShowPopup = () => {
  rootElement.classList.add(HIDE_OVERFLOW_CLASS_NAME);
};

const onClosePopup = () => {
  rootElement.classList.remove(HIDE_OVERFLOW_CLASS_NAME);
};

const popupPresenter = new PopupPresenter({
  parentElement: rootElement,
  commentsModel,
  onShowPopup,
  onClosePopup,
});

const mainScreenPresenter = new MainScreenPresenter({
  parentElement: mainContainer,
  filtersModel,
});
mainScreenPresenter.init();

const filmsPresenter = new FilmsPresenter({
  parentElement: mainContainer,
  filmsModel,
  popupPresenter,
});
filmsPresenter.init();

const filmsCountPresenter = new FilmsCountPresenter({
  parentElement: document.querySelector(ContainerSelector.FooterInfo),
  filmsModel,
});
filmsCountPresenter.init();
