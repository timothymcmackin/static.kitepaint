import Product from "../../models/Product";
// import { error } from "../../theme/Alert";

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
  // const response = await this.axiosInstance.get(`/products.php`);

  // // Handle invalid responses
  // if (!response.data) {
  //   const message = response.data
  //     ? response.data.message
  //     : "The request for products was unsuccessful";
  //   error(message);
  //   return new Promise((resolve, reject) => reject(message));
  // }

  const cr100pct = `<?xml version="1.0" encoding="utf-8"?>\r\n<!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\r\n\t viewBox="0 0 1741.8 587.4" style="enable-background:new 0 0 1741.8 587.4;" xml:space="preserve">
    <polygon
    class="leading-edge"
    points="798,39.2 1203.9,42.1 1549,41 1604.8,42.2 1903.6,51.4 1946.2,52.8 1963.2,12.5 1572.9,2.1 1205.6,0 702.1,0.1 372.2,5 0,13.9 17,54.1 358.4,43.5 414.2,42.3 "
    id="polygon25"
    transform="matrix(0.9,0,0,0.9,0.48832246,0.52052154)" />
    <path
    id="vert1" class="panel vert1" data-id="vert1" data-autofill="vert1" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 51.978516,48.113281 c -12.20471,0.358779 -24.297254,0.723634 -36.189454,1.097657 l 226.607418,537.451172 0.19922,-0.084 28.85742,-17.30468 z" />
 <path
    id="vert5" class="panel vert5" data-id="vert5" data-autofill="vert5" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 363.18359,41.287109 c -11.93714,0.184311 -23.73188,0.37628 -35.42968,0.572266 L 521.20117,419.50391 548.5293,403.11523 Z" />
 <path
    id="vert4" class="panel vert4" data-id="vert4" data-autofill="vert4" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 284.64844,42.613281 c -12.55283,0.231372 -24.95482,0.471809 -37.22852,0.716797 l 200.30469,420.236332 29.21875,-17.52149 z" />
 <path
    id="vert3" class="panel vert3" data-id="vert3" data-autofill="vert3" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 206.76562,44.179688 c -12.39727,0.269265 -24.63844,0.546779 -36.74804,0.830078 l 205.38867,461.925784 29.30273,-17.57227 z" />
 <path
    id="vert6" class="panel vert6" data-id="vert6" data-autofill="vert6" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 440.18945,40.203125 c -13.05153,0.166749 -25.95653,0.34148 -38.73633,0.521484 L 592.79102,376.57227 621.88477,359.125 Z" />
 <path
    id="vert2" class="panel vert2" data-id="vert2" data-autofill="vert2" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 130.75391,45.964844 c -12.2834,0.31054 -24.41549,0.629977 -36.400394,0.955078 L 305.7793,548.6875 335.1582,531.07031 Z" />
 <path
    id="vert7" class="panel vert7" data-id="vert7" data-autofill="vert7" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 519.26367,39.292969 c -13.41131,0.137924 -26.69741,0.28041 -39.83594,0.43164 l 185.40039,293.648441 29.09376,-17.44727 z" />
 <path
    id="vert8" class="panel vert8" data-id="vert8" data-autofill="vert8" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 605.2168,38.515625 c -13.86689,0.108417 -27.59136,0.223794 -41.18164,0.345703 l 175.24414,249.865232 25.55273,-15.32422 3.0957,-2.17187 -59.07031,-84.94141 z" />
 <path
    id="horiz1" class="panel horiz1" data-id="horiz1" data-autofill="horiz1" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 748.0214,243.2832 -72.498,43.69532 18.1094,28.68359 73.7929,-44.47461 z m -101.5527,61.20508 -113.4394,68.36914 15.5,30.25781 116.0507,-69.94335 z m -140.7363,84.82031 -114.7051,69.13086 13.8867,31.23047 116.3184,-70.10351 z m -143.97659,86.77344 -103.25,62.22656 13.30078,31.58399 103.83594,-62.58008 z m -132.27929,79.7207 -0.26758,0.16211 13.30273,31.55274 0.26953,-0.16211 z" />
 <path
    id="horiz2" class="panel horiz2" data-id="horiz2" data-autofill="horiz2" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 678.22845,201.83203 -108.75,65.54297 16.7929,29.4746 111.4786,-67.18554 z m -137.8067,83.05468 -109.1035,65.75586 14.6621,30.76172 111.2344,-67.04101 z m -138.291,83.34571 -108.2578,65.24609 13.3067,31.57813 109.6132,-66.0625 z m -137.6054,82.93359 -63.5977,38.33008 13.3125,31.57422 63.5898,-38.32422 z" />
 <path
    id="horiz3" class="panel horiz3" data-id="horiz3" data-autofill="horiz3" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 667.05066,126.73439 -67.1484,40.47069 18.1094,28.6836 68.4433,-41.25 z m -96.20109,57.98046 -102.2071,61.59961 15.4981,30.25586 104.81829,-63.17188 z m -129.504,78.05078 -108.4785,65.37891 13.8848,31.22851 110.0937,-66.35156 z m -137.75,83.02149 -100.83003,60.76953 13.29883,31.58007 101.416,-61.12109 z m -129.91206,78.29492 -0.26758,0.16211 13.3125,31.57422 0.26758,-0.16211 z" />
 <path
    id="horiz4" class="panel horiz4" data-id="horiz4" data-autofill="horiz4" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 626.95106,69.072279 -0.2891,0.17383 19.5215,27.83203 0.1719,-0.10352 z m -29.4043,17.72266 -97.4766,58.748031 16.793,29.47657 100.2031,-60.39257 z m -126.5332,76.259751 -100.2969,60.44727 14.6621,30.76172 102.4278,-61.73243 z m -129.4824,78.03711 -102.6543,61.86719 13.3066,31.58008 104.0098,-62.68555 z m -132.002,79.55469 -63.62498,38.3457 13.3125,31.57617 63.61718,-38.34179 z" />
 <path
    id="horiz5" class="panel horiz5" data-id="horiz5" data-autofill="horiz5" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 605.42176,38.113289 c -21.6471,0.16873 -42.842,0.36106 -63.8183,0.5625 l -16.5528,9.97657 18.1094,28.68164 63.0937,-38.02539 z m -109.4238,28.04883 -91.8594,55.361331 15.5,30.25585 94.4688,-56.935541 z m -119.1543,71.812501 -101.3691,61.09374 13.8867,31.22852 102.9804,-62.06641 z m -130.64063,78.73437 -98.41016,59.31054 13.29883,31.58204 98.99609,-59.66407 z m -127.54297,76.86914 -0.26953,0.16211 13.3125,31.57422 0.26953,-0.16211 z" />
 <path
    id="horiz6" class="panel horiz6" data-id="horiz6" data-autofill="horiz6" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 468.6777,39.455099 c -22.7745,0.26832 -45.1667,0.55757 -67.1348,0.86523 l -0.3379,0.20312 c 12.2646,-0.17218 24.6294,-0.34011 37.1446,-0.5 l 7.5117,13.1836 z m -68.666,1.78906 -91.48834,55.13867 14.6621,30.759771 93.61914,-56.423831 z m -120.6739,72.728511 -97.04688,58.48827 13.30469,31.57813 98.40235,-59.30664 z m -126.39649,76.17577 -63.654287,38.36329 13.312497,31.57421 63.64648,-38.35937 z" />
 <path
    id="horiz7" class="panel horiz7" data-id="horiz7" data-autofill="horiz7" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 331.23046,41.398449 c -23.0336,0.38232 -45.5883,0.78846 -67.7188,1.21484 l -45.4277,27.37891 13.8847,31.228511 z m -142.42,46.23633 -95.988237,57.851551 13.298827,31.58203 96.57621,-58.20507 z m -125.175737,75.441391 -0.26758,0.16211 13.3125,31.57422 0.26758,-0.16211 z" />
 <path
    id="horiz8" class="panel horiz8" data-id="horiz8" data-autofill="horiz8" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 190.93156,44.123059 c -23.32031,0.52242 -46.12537,1.06845 -68.42578,1.64062 l -0.36328,0.21875 c 2.80628,-0.07225 5.54108,-0.1474 8.36328,-0.21875 l 11.68555,27.73438 z M 99.537033,59.607429 35.855392,97.988289 49.167893,129.56056 112.84172,91.185559 Z" />
 <path
    id="centerPanel" class="panel centerPanel" data-id="centerPanel" data-autofill="centerPanel" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 870.71278,37.387128 c -28.3433,0 -104.9838,0.17807 -264.62461,1.59082 l 161.99471,232.945312 114.4108,-68.76914 4.4806,0.0475 115.37762,69.35098 161.9948,-232.947072 c -144.0583,-1.27486 -219.49222,-1.5383 -253.87572,-1.57852 l -26.2266,-0.14941 v -0.46934 c 0,0 -4.0821,-0.0211 -13.5298,-0.0211 z" />
 <path
    id="vert1-9" class="panel vert1-9" data-id="vert1-9" data-autofill="vert1-9" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="M 51.97856,48.11328 C 39.77385,48.47206 27.6813,48.83691 15.7891,49.21093 l 226.60742,537.45118 0.19922,-0.084 28.85742,-17.30468 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="vert5-2" class="panel vert5-2" data-id="vert5-2" data-autofill="vert5-2" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 363.18366,41.2871 c -11.93717,0.18432 -23.73191,0.37628 -35.42971,0.57227 l 193.44721,377.64454 27.3282,-16.38868 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="vert4-2" class="panel vert4-2" data-id="vert4-2" data-autofill="vert4-2" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 284.64848,42.61328 c -12.55283,0.23137 -24.95482,0.47181 -37.22852,0.71679 l 200.3047,420.23634 29.2187,-17.52149 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="vert3-3" class="panel vert3-3" data-id="vert3-3" data-autofill="vert3-3" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 206.76566,44.17968 c -12.39727,0.26927 -24.63844,0.54678 -36.74804,0.83008 l 205.38864,461.92579 29.3028,-17.57227 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="vert6-9" class="panel vert6-9" data-id="vert6-9" data-autofill="vert6-9" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 440.18946,40.20312 c -13.0515,0.16675 -25.9565,0.34148 -38.7363,0.52148 l 191.3379,335.84767 29.0937,-17.44727 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="vert2-8" class="panel vert2-8" data-id="vert2-8" data-autofill="vert2-8" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 130.75395,45.96484 c -12.2834,0.31054 -24.41549,0.62998 -36.40039,0.95508 l 211.42578,501.76758 29.3789,-17.61719 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="vert7-9" class="panel vert7-9" data-id="vert7-9" data-autofill="vert7-9" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 519.26366,39.29296 c -13.4113,0.13793 -26.6974,0.28041 -39.8359,0.43164 l 185.4004,293.64845 29.0938,-17.44727 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="vert8-3" class="panel vert8-3" data-id="vert8-3" data-autofill="vert8-3" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 605.21686,38.51562 c -13.8669,0.10842 -27.5914,0.22379 -41.1817,0.3457 l 175.2442,249.86524 25.5527,-15.32422 3.0957,-2.17187 -59.0703,-84.94141 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="horiz1-1" class="panel horiz1-1" data-id="horiz1-1" data-autofill="horiz1-1" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 748.02146,243.2832 -72.498,43.69532 18.1094,28.68359 73.7929,-44.47461 z m -101.5527,61.20508 -113.4394,68.36914 15.5,30.25781 116.0507,-69.94335 z m -140.7363,84.82031 -114.7051,69.13086 13.8867,31.23047 116.3184,-70.10351 z m -143.97661,86.77344 -103.25,62.22656 13.30078,31.58399 103.83593,-62.58008 z m -132.27929,79.7207 -0.26758,0.16211 13.30273,31.55274 0.26953,-0.16211 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="horiz2-9" class="panel horiz2-9" data-id="horiz2-9" data-autofill="horiz2-9" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 678.22846,201.83203 -108.75,65.54297 16.7929,29.4746 111.4786,-67.18554 z m -137.8067,83.05468 -109.1035,65.75586 14.6621,30.76172 111.2344,-67.04101 z m -138.291,83.34571 -108.25777,65.24609 13.3067,31.57813 109.61317,-66.0625 z m -137.60537,82.93359 -63.5977,38.33008 13.3125,31.57422 63.5898,-38.32422 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="horiz3-1" class="panel horiz3-1" data-id="horiz3-1" data-autofill="horiz3-1" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 667.05066,126.73439 -67.1484,40.47069 18.1094,28.6836 68.4433,-41.25 z m -96.2011,57.98046 -102.2071,61.59961 15.4981,30.25586 104.8183,-63.17188 z m -129.504,78.05078 -108.47845,65.37891 13.8848,31.22851 110.09365,-66.35156 z m -137.74995,83.02149 -100.83003,60.76953 13.29883,31.58007 101.416,-61.12109 z m -129.91206,78.29492 -0.26758,0.16211 13.3125,31.57422 0.26758,-0.16211 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="horiz4-3" class="panel horiz4-3" data-id="horiz4-3" data-autofill="horiz4-3" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 626.95106,69.07227 -0.2891,0.17383 19.5215,27.83203 0.1719,-0.10352 z m -29.4043,17.72266 -97.4766,58.74804 16.793,29.47657 100.2031,-60.39257 z m -126.5332,76.25976 -100.2969,60.44727 14.6621,30.76172 102.4278,-61.73243 z m -129.48236,78.03711 -102.6543,61.86719 13.3066,31.58008 104.0098,-62.68555 z m -132.002,79.55469 -63.62498,38.3457 13.3125,31.57617 63.61718,-38.34179 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="horiz5-7" class="panel horiz5-7" data-id="horiz5-7" data-autofill="horiz5-7" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 605.42176,38.11328 c -21.6471,0.16873 -42.842,0.36106 -63.8183,0.5625 l -16.5528,9.97657 18.1094,28.68164 63.0937,-38.02539 z m -109.4238,28.04883 -91.8594,55.36134 15.5,30.25585 94.4688,-56.93555 z m -119.1543,71.81251 -101.36906,61.09374 13.8867,31.22852 102.98036,-62.06641 z m -130.64059,78.73437 -98.41016,59.31054 13.29883,31.58204 98.99609,-59.66407 z m -127.54297,76.86914 -0.26953,0.16211 13.3125,31.57422 0.26953,-0.16211 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="horiz6-5" class="panel horiz6-5" data-id="horiz6-5" data-autofill="horiz6-5" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 468.67776,39.45509 c -22.7745,0.26832 -45.1667,0.55757 -67.1348,0.86523 l -0.3379,0.20312 c 12.2646,-0.17218 24.6294,-0.34011 37.1446,-0.5 l 7.5117,13.1836 z m -68.666,1.78906 -91.48836,55.13867 14.6621,30.75978 93.61916,-56.42384 z m -120.67392,72.72852 -97.04688,58.48827 13.30469,31.57813 98.40235,-59.30664 z m -126.39649,76.17577 -63.65429,38.36329 13.3125,31.57421 63.64648,-38.35937 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="horiz7-5" class="panel horiz7-5" data-id="horiz7-5" data-autofill="horiz7-5" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 331.2305,41.39844 c -23.0336,0.38232 -45.5883,0.78846 -67.7188,1.21484 l -45.4277,27.37891 13.8847,31.22852 z m -142.42,46.23633 -95.98824,57.85156 13.29883,31.58203 96.57621,-58.20507 z m -125.17574,75.4414 -0.26758,0.16211 13.3125,31.57422 0.26758,-0.16211 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
 <path
    id="horiz8-9" class="panel horiz8-9" data-id="horiz8-9" data-autofill="horiz8-9" ng-click="color_panel('all', $event)" fill="#FFFFFF" stroke="#000000"
    
    d="m 190.9316,44.12305 c -23.32031,0.52242 -46.12537,1.06845 -68.42578,1.64062 l -0.36328,0.21875 c 2.80628,-0.0722 5.54108,-0.1474 8.36328,-0.21875 l 11.68555,27.73438 z m -91.39453,15.48437 -63.68164,38.38086 13.3125,31.57228 63.67383,-38.37501 z"
    transform="matrix(-1,0,0,1,1768.5841,0.11311)" />
    </svg>`;

  const response = {
    data: [
      {
        id: "27",
        name: "Compass Rose",
        manufacturer: "6",
        url: "",
        colors:
          '[{"name":"White","color":"#ffffff","$$hashKey":"018"},{"name":"Light Gray","color":"#cdcdcd","$$hashKey":"01E"},{"name":"Dark Gray","color":"#818181","$$hashKey":"01G"},{"name":"Black","color":"#000000","$$hashKey":"01I"},{"name":"Yellow","color":"#FFFF00","$$hashKey":"01K"},{"name":"Lime","color":"#C9FF00","$$hashKey":"01M"},{"name":"Mint","color":"#65CF8B","$$hashKey":"01O"},{"name":"Green","color":"#00933D","$$hashKey":"01Q"},{"name":"Dark Blue","color":"#1F3593","$$hashKey":"01S"},{"name":"Mid Blue","color":"#0072C0","$$hashKey":"01U"},{"name":"Light Blue","color":"#00AFF1","$$hashKey":"01W"},{"name":"Teal","color":"#00AFB2","$$hashKey":"01Y"},{"name":"Plum","color":"#590368","$$hashKey":"020"},{"name":"Purple","color":"#AC2293","$$hashKey":"022"},{"name":"Lavender","color":"#A266DF","$$hashKey":"024"},{"name":"Rubine Red","color":"#FF0268","$$hashKey":"026"},{"name":"Red","color":"#FF0000","$$hashKey":"028"},{"name":"Orange","color":"#FF9A00","$$hashKey":"02A"},{"name":"Gold","color":"#FFD000","$$hashKey":"02C"}]',
        variations: [
          {
            id: "27",
            name: "100%",
            svg: cr100pct,
            sortIndex: 0
          }
        ],
        notes: '[""]',
        status: "2",
        embed: "watty.us,www.watty.us"
      }
    ]
  };

  response.data = response.data.map(product => {
    product.colors = JSON.parse(product.colors);
    product.notes = JSON.parse(product.notes).filter(note => !!note);
    return new Product(product);
  });

  return response;
}
