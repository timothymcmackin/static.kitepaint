// import { isBeta, isProduction } from "../constants/environment";

/**
 * Builds the correct asset url depending on the current environment.
 * @param {String} path An absolute asset path e.g. "/my-image.png"
 */
export default function getAssetUrl(path) {
  return `//timothymcmackin.github.io/static.kitepaint${path}`;
  // if (isBeta) {
  //   return `//static.beta.kitepaint.com${path}`;
  // }
  // if (isProduction) {
  //   return `//static.kitepaint.com${path}`;
  // }
  // return path;
}
