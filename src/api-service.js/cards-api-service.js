import ApiService from '../framework/api-service.js';
import {Method} from '../consts.js';

export default class CardsApiService extends ApiService {
  get cards() {
    return this._load({url: 'products'})
      .then(ApiService.parseResponse);
  }

  async getProduct(productId) {
    return this._load({url: `products/${productId}`})
      .then(ApiService.parseResponse);
  }

  async addCard(card) {
    const response = await this._load({
      url: `products/${card.id}`,
      method: Method.PUT,
      body: JSON.stringify(card),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteCard(card) {
    const response = await this._load({
      url: `products/${card.id}`,
      method: Method.DELETE,
    });
    return response;
  }

  get cart() {
    return this._load({url: 'cart'})
      .then(ApiService.parseResponse);
  }
}
