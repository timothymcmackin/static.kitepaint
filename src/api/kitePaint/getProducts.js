/**
 * Get all products.
 * @param  {Boolean} [useCache=true] If true, the request will be cached, and subsequent duplicate
 * requests will not be made within 10 minutes.
 * @return {Promise}
 */
export default async function getProducts(useCache = true) {
  // Look for cached values if useCache is true
  if (useCache) {
    const cache = await this._cacheable("getProducts");
    if (!cache.continue) {
      return cache;
    }
  }

  // Make the request
  const response = await this.axiosInstance.get(`/products.php`, {
    params: {
      activated: 1
    }
  });

  // Handle invalid responses
  if (!response.data) {
    return new Promise((resolve, reject) =>
      reject(
        response.data
          ? response.data.message
          : "The request for products was unsuccessful"
      )
    );
  }

  response.data = response.data.map(product => {
    product.variations = JSON.parse(product.variations);
    product.colors = JSON.parse(product.colors);
    product.notes = JSON.parse(product.notes).filter(note => !!note);
    return product;
  });

  return response;
}
