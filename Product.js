
/**
 * Class representing a Product from our API
 */
class Product {
  /**
   * Constructor for Product class.
   * @param options: { flavours: ['lime', 'orange'],
   *    name: 'string',
   *    percentageRange: 'string',
   *    symptoms: ['string'],
   *    image: '/path/to/img.jpg',
   *    largeImage: '/path/to/largeImg.jpg'
   * }
   */
  constructor(options) {
    this.props = {
      name: options.name,
      percentageRange: options.percentageRange,
      symptoms: options.symptoms,
      image: options.image,
      largeImage: options.largeImage,
      flavours: options.flavours
    };
  }

  /**
   * Returns a Javascript Object (POJO)
   * @returns {{name: string, percentageRange: *, symptoms: *, image, largeImage: *}|*}
   */
  toObject() {
    return this.props;
  }

  /**
   * Returns product name
   * @returns {string|*}
   */
  get name() {
    return this.props.name;
  }

  /**
   * Returns array of flavours
   * @returns {*}
   */
  get flavours() {
    return this.props.flavours;
  }

  /**
   * Returns product percentage range
   * @returns {*}
   */
  get percentageRange() {
    return this.props.percentageRange;
  }

  /**
   * returns
   * @returns {*}
   */
  get symptoms() {
    return this.props.symptoms;
  }
  get image() {
    return this.props.image;
  }
  get largeImage() {
    return this.props.largeImage;
  }
  toString() {
    return `name: ${this.name}, 
      percentageRange: ${this.percentageRange}, 
      symptomsTreated: ${this.symptoms.toString()},
      image url: ${this.image},
      large image url: ${this.largeImage},
      palette: ${this.flavours.toString()}`;
  }
}

export default Product;
