const zipcodes = require("zipcodes");
function zipCodeSearch(zipcode, radius) {
  return zipcodes.radius(zipcode,radius);
}

module.exports = zipCodeSearch;
