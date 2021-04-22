import Manufacturer from "../../models/Manufacturer";
// import { error } from "../../theme/Alert";

/**
 * Get all manufacturers.
 * @param  {Boolean} [useCache=true] If true, the request will be cached, and subsequent duplicate
 * requests will not be made within 10 minutes.
 * @return {Promise} { data: Manufacturer[] }
 */
export default async function getManufacturers(useCache = true) {
  // Look for cached values if useCache is true
  if (useCache) {
    const cache = await this._cacheable("getManufacturers");
    if (!cache.continue) {
      return cache;
    }
  }

  // // Make the request
  // const response = await this.axiosInstance.get(`/manufacturers.php`, {
  //   params: {
  //     activated: 1
  //   }
  // });

  // // Handle invalid responses
  // if (!response.data) {
  //   const message = response.data
  //     ? response.data.message
  //     : "The request for manufacturers was unsuccessful";
  //   error(message);
  //   return new Promise((resolve, reject) => reject(message));
  // }

  const response = {
    data: [
      // {
      //   id: "1",
      //   name: "Revolution",
      //   logo: "revolution.png",
      //   website: "http://revkites.com"
      // },
      // {
      //   id: "3",
      //   name: "WattyWorks",
      //   logo: "wattyworks.jpg",
      //   website: "http://watty.us"
      // },
      // {
      //   id: "4",
      //   name: "3 Wind",
      //   logo: "3wind.jpg",
      //   website: ""
      // },
      // {
      //   id: "5",
      //   name: "Kite Forge",
      //   logo: "kiteforge-onblack.png",
      //   website: "http://kiteforge.com"
      // },
      {
        id: "6",
        name: "Flying Smiles Kites",
        logo: "compassRoseRough.png",
        website: "http://flyingsmileskites.com"
      }
    ]
  };

  response.data = response.data.map(
    manufacturer => new Manufacturer(manufacturer)
  );

  return response;
}
