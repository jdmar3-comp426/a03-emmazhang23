import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {
        city: getStatistics(mpg_data.reduce(
        function(previousValue, currentValue) {
          return previousValue.concat(currentValue.city_mpg)
        },
        [])).mean,
        highway: getStatistics(mpg_data.reduce(
            function(previousValue, currentValue) {
              return previousValue.concat(currentValue.highway_mpg)
            },
            [])).mean
        },
    allYearStats: getStatistics(mpg_data.reduce(
        function(previousValue, currentValue) {
          return previousValue.concat(currentValue.year)
        },
        [])),
    ratioHybrids: mpg_data.filter(x=> x.hybrid === true).length/mpg_data.length,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */


 export const moreStats = {
  makerHybrids: mpg_data.reduce((acc, d) => {
    if(d.hybrid==true){
      const found = acc.find(a => a.make === d.make);
      const value=d.id
      if (!found) {
        acc.push({make: d.make, hybrids: [d.id]})
      }
      else{
        found.hybrids.push(value)
      }
    }
    return acc;
    }, []),
    avgMpgByYearAndHybrid: mpg_data.reduce(function (acc, obj) {
      let key = obj["year"]
      if (!acc[key]) {
        acc[key] = {hybrid: {city: {}, highway: {}} , notHybrid:{}}
      } 
      if(obj["hybrid"]==true){
        acc[key].hybrid.city.push(obj.city_mpg)    
        acc[key].hybrid.highway.push(obj.highway_mpg)      
      }else{
        acc[key].notHybrid.city.push(obj.city_mpg)    
        acc[key].notHybrid.highway.push(obj.highway_mpg)   
      }
      

      return acc
    }, {})
  }

  // export const moreStats = {
  //   makerHybrids: mpg_data.reduce(function (acc, obj) {
  //     let key = "make"
  //     let second="hybrids"
  //     if(obj['hybrid']==true){
  //       if (!(acc[key]==obj['make'])) {
  //         acc[key] = obj['make']
  //         acc[seconds][obj['make']]
  //       }
  //       acc[key].push(obj)
  //     }
  //     return acc.concat(currentValue.id)        
  //   }, [])

// export const moreStats = {
//     makerHybrids: mpg_data.reduce(function (acc, obj) {
//       let key = obj['make']
//       if(obj['hybrid']==true){
//         if (!acc[key]) {
//           acc[key] = []
//         }
//         acc[key].push(obj)
//       }
//       return acc.concat(currentValue.id)        
//     }, {})
//     //avgMpgByYearAndHybrid: undefined
// };
