import Api from './api/api.js';
import FilmsModel from './model/films-model/films-model.js';
import CommentsModel from './model/comments-model/comments-model.js';
import FiltersModel from './model/filters-model/filters-model.js';
import HeaderPresenter from './presenter/header-presenter/header-presenter.js';
import FilmsPresenter from './presenter/films-presenter/films-presenter.js';
import FilmsCountPresenter from './presenter/films-count-presenter/films-count-presenter.js';
import PopupPresenter from './presenter/popup-presenter/popup-presenter.js';
import {ContainerSelector, HIDE_OVERFLOW_CLASS_NAME} from './data/constants.js';
import FiltersPresenter from './presenter/filters-presenter/filters-presenter.js';

const rootElement = document.body;
const mainContainer = document.querySelector(ContainerSelector.MainScreen);

const END_POINT = 'https://17.ecmascript.htmlacademy.pro/cinemaddict';
const AUTHORIZATION = 'Basic leralemmcinemaddict2024';

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel({api});
filmsModel.init(null);

const commentsModel = new CommentsModel();

const filtersModel = new FiltersModel();

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
  filmsModel,
  commentsModel,
  onShowPopup,
  onClosePopup,
});

const filtersPresenter = new FiltersPresenter({
  parentElement: mainContainer,
  filmsModel,
  filtersModel,
});
filtersPresenter.init();

const filmsPresenter = new FilmsPresenter({
  parentElement: mainContainer,
  filmsModel,
  filtersModel,
  popupPresenter,
});
filmsPresenter.init();

const filmsCountPresenter = new FilmsCountPresenter({
  parentElement: document.querySelector(ContainerSelector.FooterInfo),
  filmsModel,
});
filmsCountPresenter.init();
