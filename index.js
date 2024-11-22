const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

// data imports
const hotels = require('./data/hotels');
const amenities = require('./data/amenities');
const countries = require('./data/countries');
const categories = require('./data/category');
const {
  capitalizeFirstLetter,
  capitalizeWoHyphen,
  sortByPriceAsc,
  sortByPriceDesc,
} = require('./utils');

const app = express();
const port = 3010;

app.use(cors());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send('Welcome to TripWithUs !');
  // res.send(hotels);
  console.log(hotels);
});

// API ENDPOINT 1
// <http://localhost:3000/hotels/sort/pricing?pricing=low-to-high>

app.get('/hotels/sort/pricing', (req, res) => {
  const { pricing } = req.query;
  let sortedHotels;

  if (pricing === 'low-to-high') {
    sortedHotels = hotels.slice().sort((a, b) => a.price - b.price);
    res.json(sortedHotels);
  } else if (pricing === 'high-to-low') {
    sortedHotels = hotels.slice().sort((a, b) => a.price - b.price);
    res.json(sortedHotels);
  } else {
    res.status(400).json({
      'invalid parameter for pricing': pricing,
    });
  }
});

//  API ENDPOINT 2
// <http://localhost:3000/hotels/sort/rating?rating=low-to-high>

app.get('/hotels/sort/rating', (req, res) => {
  const { rating } = req.query;
  let sortedHotels;

  if (rating === 'low-to-high') {
    sortedHotels = hotels.slice().sort((a, b) => a.rating - b.rating);
    res.json(sortedHotels);
  } else if (rating === 'high-to-low') {
    sortedHotels = hotels.slice().sort((a, b) => b.rating - a.rating);
    res.json(sortedHotels);
  } else {
    res.status(400).json({
      'invalid parameter for rating': rating,
    });
  }
});

// API ENDPOINT 3
// <http://localhost:3000/hotels/sort/reviews?reviews=least-to-most>

app.get('/hotels/sort/reviews', (req, res) => {
  const { reviews } = req.query;
  let sortedHotels;

  if (reviews === 'least-to-most') {
    sortedHotels = hotels.slice().sort((a, b) => a.reviews - b.reviews);
    res.json(sortedHotels);
  } else if (reviews === 'most-to-least') {
    sortedHotels = hotels.slice().sort((a, b) => b.reviews - a.reviews);
    res.json(sortedHotels);
  } else {
    res.status(400).json({
      'invalid parameter for reviews': reviews,
    });
  }
});

// API ENDPOINT 4
// <http://localhost:3000/hotels/filter/amenity?amenity=spa>

app.get('/hotels/filter/amenity', (req, res) => {
  let { amenity } = req.query;
  let amenityFilteredHotels;
  amenity = capitalizeFirstLetter(amenity);
  console.log(amenity);

  if (amenities.includes(amenity)) {
    amenityFilteredHotels = hotels.filter((hotel) => hotel.amenity === amenity);
    res.json(amenityFilteredHotels);
  } else {
    res.status(400).json({
      'invalid parameter for amenity': amenity,
    });
  }
});

// API ENDPOINT 5
// <http://localhost:3000/hotels/filter/country?country=india>

app.get('/hotels/filter/country', (req, res) => {
  let { country } = req.query;
  let countryFilteredHotels;
  country = capitalizeFirstLetter(country);
  console.log(country);

  if (countries.includes(country)) {
    countryFilteredHotels = hotels.filter((hotel) => hotel.country === country);
    res.json(countryFilteredHotels);
  } else {
    res.status(400).json({
      'invalid parameter for country': country,
    });
  }
});

// API ENDPOINT 6
// <http://localhost:3000/hotels/filter/category?category=luxury>

app.get('/hotels/filter/category', (req, res) => {
  let { category } = req.query;
  let categoryFilteredHotels;
  category = capitalizeWoHyphen(category);
  console.log(category);

  if (categories.includes(category)) {
    categoryFilteredHotels = hotels.filter(
      (hotel) => hotel.category === category
    );
    res.json(categoryFilteredHotels);
  } else {
    res.status(400).json({
      'invalid parameter for category': category,
    });
  }
});

// API ENDPOINT 7
// <http://localhost:3000/hotels>

app.get('/hotels', (req, res) => {
  res.json(hotels);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
