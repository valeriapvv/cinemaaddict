import FilmsBlockView from './films-block-view.js';

export default class NoFilmsBlockView extends FilmsBlockView {
  constructor() {
    super();
    this._setTemplate({
      title: 'There are no movies in our database',
      isVisibleTitle: true,
    });
  }
}
