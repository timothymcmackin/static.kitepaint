import { handleActions } from "redux-actions";
import { fromJS } from "immutable";
import { GET_PRODUCTS } from "../actions";

export const defaultState = fromJS({});

/**
 * The reducer managing retrieved products.
 */
export default handleActions(
  {
    [GET_PRODUCTS.RECEIVED]: (state, action) => {
      const { data } = action.payload;
      const productsById = data.reduce((accumulated, product) => {
        accumulated[product.id] = product;
        return accumulated;
      }, {});
      return state.merge(productsById);
    }
  },
  defaultState
);

/**
 * Gets all the products stored in redux
 * @param  {Map} state
 * @param {String} groupBy A value to group the products by
 * @return {Object} Arrays of products indexed by the grouping value
 */
export const getProductsGrouped = (state, groupBy) => {
  const products = state.get("products");
  return products
    .toList()
    .groupBy(product => product.get(groupBy))
    .toJS();
};

/**
 * Retrieve a stored product based on the provided id
 * @param  {Map} state
 * @param  {String} id
 * @return {Object} the product
 */
export const getProductById = (state, id) => {
  const products = state.get("products");
  const product = products.get(id, null);
  if (!product) {
    return null;
  }
  return product.toJS();
};

export const getProductsWithIndex = state => {
  return state.get("products").toJS();
};
