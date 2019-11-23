const moment = require('moment');

module.exports.newReservation = (listing, startDate, hasPrimaryIds = false, currentIteration) => {
  const rand = Math.trunc(Math.random() * 3);
  const rand2 = Math.trunc(Math.random() * 5);
  const confirmationNumber = hasPrimaryIds ? `${listing}-${currentIteration},` : '';
  const checkInDate = startDate.format();
  const checkOutDate = moment(checkInDate).add(rand2, 'days').format();
  const guestAdultCount = rand + 1; // random between 1 to 3
  const guestChildCount = 3 - guestAdultCount; // remainder of guest slots (3-person max)
  const guestInfantCount = rand; // random between 0 to 3
  return [`${confirmationNumber}${listing},${checkInDate},${checkOutDate},${guestAdultCount},${guestChildCount},${guestInfantCount}`, moment(checkOutDate).add(rand, 'days')];
};

module.exports.newListing = (listing, hasPrimaryIds = false) => {
  const rand = Math.random();
  const listingId = hasPrimaryIds ? (listing.toString()).concat(',') : '' ;
  const listingName = `l#${listing}`;
  const price = parseInt((50 * rand).toFixed(2), 10);
  const rating = parseInt(((rand * 6) + 3).toFixed(2), 10);
  const reviewCount = Math.trunc(rand * 650) + 25;
  const guestMax = Math.trunc(rand * 15) + 3;

  return `${listingId}${listingName},${price},${rating},${reviewCount},${guestMax}`;
};
