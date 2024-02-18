import AbstractView from '../../framework/view/abstract-view.js';
import {getLoadingComponent} from './template.js';

export default class LoadingView extends AbstractView {
  get template() {
    return getLoadingComponent();
  }
}
