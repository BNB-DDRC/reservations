const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { newReservation, newListing } = require('./csvRandom');
const { loading } = require('./csvLoadBar');

const listingsFile = fs.createWriteStream(path.resolve(__dirname, 'csv base data', 'listings.csv'));
const reservationsFile = fs.createWriteStream(path.resolve(__dirname, 'csv base data', 'reservations.csv'));

const createListings = (file, callback) => {
  const recordCount = 10 ** 7;
  let listingsLeft = recordCount;
  let canContinue = true;
  const writeListings = () => {
    do {
      loading('Listing generation', listingsLeft, recordCount, 0.001);
      listingsLeft -= 1;
      const listing = newListing(recordCount - listingsLeft);
      if (listingsLeft === 0) {
        file.write(listing, () => file.end(() => {
          loading('Listing generation');
          callback();
        }));
      } else {
        canContinue = file.write(listing);
      }
    } while ((listingsLeft > 0) && canContinue);
    if (listingsLeft > 0) {
      file.once('drain', writeListings);
    }
  };
  writeListings();
};
const createReservations = (file) => {
  const recordCount = 10 ** 7;
  let listingsLeft = recordCount;

  const writeReservations = () => {
    let canContinue = true;
    const create9Reservations = (listingId, startDate) => {
      const newReservationsArray = [];
      for (let reservationsLeft = 9; reservationsLeft; reservationsLeft -= 1) {
        newReservationsArray.push(newReservation(listingId, startDate));
      }
      return newReservationsArray.join('\n');
    };
    do {
      loading('Reservation generation', listingsLeft, recordCount, 0.0001);
      listingsLeft -= 1;
      const reservationsStartDate = moment(Date.now());
      const listingId = recordCount - listingsLeft - 1;
      let listingReservations = create9Reservations(listingId, reservationsStartDate);
      listingReservations = listingsLeft === recordCount - 1 ? listingReservations : '\n'.concat(listingReservations);
      if (listingsLeft === 0) {
        file.write(listingReservations, () => file.end(() => {
          loading('Reservation generation');
        }));
      } else {
        canContinue = file.write(listingReservations);
      }
    } while ((listingsLeft > 0) && canContinue);
    if (listingsLeft > 0) {
      file.once('drain', writeReservations);
    }
  };
  writeReservations();
};

createListings(listingsFile, createReservations.bind(null, reservationsFile));
