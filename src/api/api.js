import ApiService from '../framework/api-service.js';
import {Method, ResourceRoute} from './constants.js';

export default class Api extends ApiService {
  async getFilms() {
    const response = await this._load({
      url: ResourceRoute.Films,
    });

    const films = ApiService.parseResponse(response);

    return films;
  }

  async updateFilm(update) {
    const {id} = update;

    const response = await this._load({
      url: `${ResourceRoute.Films}/${id}`,
      method: Method.Put,
      body: JSON.stringify(update),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const film = ApiService.parseResponse(response);

    return film;
  }

  async getComments(filmId) {
    const response = await this._load({
      url: `${ResourceRoute.Comments}/${filmId}`,
    });

    const comments = ApiService.parseResponse(response);

    return comments;
  }

  async deleteComment(commentId) {
    await this._load({
      url: `${ResourceRoute.Comments}/${commentId}`,
      method: Method.Delete,
    });
  }
}
