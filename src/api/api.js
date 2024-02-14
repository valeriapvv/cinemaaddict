import ApiService from '../framework/api-service.js';

const ResourceRoute = {
  Films: 'movies',
  Comments: 'comments',
};

export default class Api extends ApiService {
  async getFilms() {
    const response = await this._load({
      url: ResourceRoute.Films,
    });

    const films = ApiService.parseResponse(response);

    return films;
  }
}
