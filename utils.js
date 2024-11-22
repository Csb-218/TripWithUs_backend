function sortByPriceAsc(a, b) {
  return a.price - b.price;
}

function sortByPriceDesc(a, b) {
  return b.price - a.price;
}

function capitalizeFirstLetter(str) {
  if (str.includes('-')) {
    return str
      .split('-') // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the array back into a string
  } else {
    return str
      .split(' ') // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the array back into a string
  }
}

function capitalizeWoHyphen(str) {
  return str
    .split('-') // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join('-'); // Join the array back into a string
}

module.exports = {
  capitalizeWoHyphen,
  capitalizeFirstLetter,
  sortByPriceDesc,
  sortByPriceAsc,
};
