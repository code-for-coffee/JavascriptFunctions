import { Node } from 'structz';
import Product from '../models/Product.js'
import tagFilter from '../helpers/tagFilter.js';

class SimilarProductsList extends Node {
  /**
   * options: {
   *  product: new Product(), // => ./models/Product.js
   *  filterType: String, // 'flavour', 'symptom by name'
   *  productList: [] of products from API
   * }
   * @param options
   */
  constructor(options) {
    super(options.product);
    let similarProducts = tagFilter(options.filterType, options.productList).forEach((item) => {
      this.appendChild(new Node(new Product(item)));
    });
  }
}

export default SimilarProductsList;
