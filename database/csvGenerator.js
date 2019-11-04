const fs = require('fs');
const path = require('path');

const listingsFile = fs.createWriteStream(path.resolve(__dirname, 'csv base data', 'listings.csv'));

for (let i = 0; i < 10 ** 6; i += 1) {
  // numbers listed below are more or less arbitrary
  // they do not correspond to anything in particular
  const rand = Math.random();
  const listingName = `l#${i}`;
  const price = parseInt((i * 50 * rand).toFixed(2), 10);
  const rating = parseInt(((rand * 6) + 3).toFixed(2), 10);
  const reviewCount = Math.trunc(rand * 650) + 25;
  const guestMax = Math.trunc(rand * 15) + 3;

  const newListing = `${listingName},${price},${rating},${reviewCount},${guestMax}`;
  listingsFile.write(i ? '\n'.concat(newListing) : newListing);
}

listingsFile.end();

const reservationsFile = fs.createWriteStream(path.resolve(__dirname, 'csv base data', 'reservations.csv'));

for (let i = 0; i < 10 ** 6; i += 1) {
  // numbers listed below are more or less arbitrary
  // they do not correspond to anything in particular
  const rand = Math.random();
  const listingId = `${i + 1}`;
  const checkInDate = '19-10-10';
  const checkOutDate = '19-10-10';
  const guestAdultCount = Math.trunc(rand * 5) + 1;
  const guestChildCount = Math.trunc(rand * 5);
  const guestInfantCount = Math.trunc(rand * 3);

  const newReservation = `${listingId},${checkInDate},${checkOutDate},${guestAdultCount},${guestChildCount},${guestInfantCount}`;
  reservationsFile.write(i ? '\n'.concat(newReservation) : newReservation);
}

reservationsFile.end();
