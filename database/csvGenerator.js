const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { newReservation, newListing } = require('./csvRandom');
const { loading } = require('./csvLoadBar');

// const listingsFileP = fs.createWriteStream(path.resolve(__dirname, 'csv base data', 'listings-P.csv'));
// const reservationsFileP = fs.createWriteStream(path.resolve(__dirname, 'csv base data', 'reservations-P.csv'));
const listingsFileC = fs.createWriteStream(path.resolve(__dirname, 'csv base data', 'listings-C.csv'));
const reservationsFileC = fs.createWriteStream(path.resolve(__dirname, 'csv base data', 'reservations-C.csv'));

// const reservationsFileC2 = fs.createWriteStream(path.resolve(__dirname, 'csv base data', 'reservations-C-2.csv'));


const createListings = (file, options, callback = () => {}, callbackFile = null, callback2 = () => {}) => {
  // for the options parameter
  // 'p': postgreSQL (no primary IDs)
  // 'c': cassandra (with primary IDs)
  const hasPrimaryIds = options === 'c';
  const recordCount = 10 ** 7;
  let listingsLeft = recordCount;
  let canContinue = true;
  const writeListings = () => {
    do {
      loading('Listing generation', listingsLeft, recordCount, 0.001);
      listingsLeft -= 1;
      let listing = newListing(recordCount - listingsLeft, hasPrimaryIds);
      listing = listingsLeft === recordCount - 1 ? listing : '\n'.concat(listing);
      if (listingsLeft === 0) {
        file.write(listing, () => file.end(() => {
          loading('Listing generation');
          callback(callbackFile, options, callback2);
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
const createReservations = (file, options, callback = () => {}) => {
  // for the options parameter
  // 'p': postgreSQL (no primary IDs)
  // 'c': cassandra (with primary IDs)
  const hasPrimaryIds = options === 'c';
  const recordCount = 10 ** 7;
  let listingsLeft = recordCount;

  const writeReservations = () => {
    let canContinue = true;
    const create9Reservations = (listingId, startDate) => {
      const newReservations = [];
      let currentDate = moment(startDate);
      for (let reservationsLeft = 9; reservationsLeft; reservationsLeft -= 1) {
        const reservationInformation = (
          newReservation(listingId, currentDate, hasPrimaryIds, 9 - reservationsLeft)
        );
        const [reservation, newDate] = reservationInformation;
        newReservations.push(reservation);
        currentDate = newDate;
      }
      return newReservations.join('\n');
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
          callback();
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

// createListings(listingsFileP, 'p', createReservations, reservationsFileP, () => { // for postgreSQL data
//   createListings(listingsFileC, 'c', createReservations, reservationsFileC); // for cassandra data
// });

createListings(listingsFileC, 'c', createReservations, reservationsFileC);
