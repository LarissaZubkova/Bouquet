import ApiService from '../framework/api-service.js';
import {Method, ActionType} from '../const.js';

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

  async deleteCard(data, type) {
    let response;
    const cart = await this.cart;
    const count = cart.products[data.id];
    const productId = Object.keys(cart.products);
    switch(type) {
      case ActionType.DELETE_ALL:
        for (let i = 0; i <= count; i++) {
          response = await this._load({
            url: `products/${data.id}`,
            method: Method.DELETE,
          });
        }
        break;
      case ActionType.DELETE:
        response = await this._load({
          url: `products/${data.id}`,
          method: Method.DELETE,
        });
        break;
      case ActionType.CLEAN:
        productId.forEach( (id) => {
          for (let i = 0; i < cart.products[id]; i++) {
            response = this._load({
              url: `products/${id}`,
              method: Method.DELETE,
            });
          }
        });
    }
    return response;
  }

  get cart() {
    return this._load({url: 'cart'})
      .then(ApiService.parseResponse);
  }
}
