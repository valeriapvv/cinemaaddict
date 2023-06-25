import HeaderPresenter from './presenter/header-presenter.js';
import {ElementSelector} from './data/constants.js';

const headerPresenter = new HeaderPresenter({
  headerElement: document.querySelector(ElementSelector.Header)
});
headerPresenter.init();
