const moment = require('moment');

module.exports.newReservation = (listing, startDate) => {
  const rand = Math.trunc(Math.random() * 3);
  const rand2 = Math.trunc(Math.random() * 5);
  const checkInDate = startDate.format();
  const checkOutDate = moment(checkInDate).add(rand2, 'days').format();
  const guestAdultCount = rand + 1; // random between 1 to 3
  const guestChildCount = 3 - guestAdultCount; // remainder of guest slots (3-person max)
  const guestInfantCount = rand; // random between 0 to 3
  return `${listing},${checkInDate},${checkOutDate},${guestAdultCount},${guestChildCount},${guestInfantCount}`;
};

module.exports.newListing = (listing) => {
  const rand = Math.random();
  const listingName = `l#${listing}`;
  const price = parseInt((listing * 50 * rand).toFixed(2), 10);
  const rating = parseInt(((rand * 6) + 3).toFixed(2), 10);
  const reviewCount = Math.trunc(rand * 650) + 25;
  const guestMax = Math.trunc(rand * 15) + 3;

  return `${listingName},${price},${rating},${reviewCount},${guestMax}`;
};
