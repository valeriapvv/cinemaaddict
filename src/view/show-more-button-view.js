import AbstractView from '../framework/abstract-view.js';

const getShowMoreButtonTemplate = () => '<button class="films-list__show-more" type="button">Show more</button>';

export default class ShowMoreButtonView extends AbstractView {
  getTemplate() {
    return getShowMoreButtonTemplate();
  }
}
