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
}