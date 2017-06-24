import { Tree } from 'structz';

/**
 * Boilerplate curry function that returns an non-mutated item.
 * @param item
 * @returns {*}
 */
let defaultSauce = (item) => {
  return item;
}

/**
 * Designed for internationalization / translating strings and numbers as needed.
 * Feel free to use this as a boilerplate. For example, we can call a 3rd party
 * service to translate english symptom strings to french in a custom curry function.
 * @param rootNode
 * @param curry
 * @returns {*}
 */
export default function mapNode(rootNode, curry = defaultSauce(item)) {
  return Tree.map(rootNode, curry);
}
