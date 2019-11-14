const moment = require('moment');
const { Client } = require('pg');

const client = new Client({
  database: 'ddrc_reservations',
});

client.connect((error) => {
  if (error) {
    console.error(error.stack);
  } else {
    console.log('Sucessfully Connected to PostgreSQL ddrc_reservations Database');
  }
});

const getListing = (listingId, callback) => {
  const queryConditional = `listing_id = ${listingId}`;
  const query = `SELECT price, rating, review_count, guest_max FROM listings WHERE ${queryConditional}`;
  client.query(query, (error, response) => {
    // console.log(error);
    // console.log(response.rows);
    callback(error, response);
  });
};

const getReservations = (listingId, callback) => {
  const query = `SELECT check_in_date, check_out_date FROM reservations WHERE listing_id = ${listingId}`;
  client.query(query, (error, response) => {
    callback(error, response);
  });
};

const postReservation = (reservation, callback) => {
  const {
    listingId,
    checkInDate,
    checkOutDate,
    guestAdultCount,
    guestChildrenCount,
    guestInfantCount,
  } = reservation;
  const checkInDateAsDate = new Date(checkInDate);
  const checkOutDateAsDate = new Date(checkOutDate);
  const checkGuestCapacityQuery = `SELECT guest_max FROM listings WHERE listing_id = ${listingId}`;
  // console.log(reservation);
  client.query(checkGuestCapacityQuery, (checkGuestMaxError, checkGuestMaxResponse) => {
    if (checkGuestMaxError) {
      callback(checkGuestMaxError);
    } else {
      const guestMax = checkGuestMaxResponse.rows[0].guest_max;
      // console.log(guestMax);
      if ((Number(guestAdultCount) + Number(guestChildrenCount)) > guestMax) {
        const err = new Error(`Invalid number of guests. This listing only allows for a maximum of ${guestMax} guests.`);
        callback(err);
      } else {
        const checkReservationDatesQuery = `SELECT check_in_date, check_out_date FROM reservations WHERE listing_id = ${listingId}`;
        client.query(checkReservationDatesQuery, (checkReservationDateError, checkReservationDateResponse) => {
          if (checkReservationDateError) {
            callback(checkReservationDateError);
          } else {
            let isAvailable = true;
            const dates = checkReservationDateResponse.rows;
            // console.log('\nProposed Dates:', checkInDateAsDate, checkOutDateAsDate);
            for (let dateRangeIndex = 0; dateRangeIndex < dates.length; dateRangeIndex += 1) {
              // console.log(dates[dateRangeIndex].check_in_date, dates[dateRangeIndex].check_out_date);
              const currentCheckIn = new Date(dates[dateRangeIndex].check_in_date);
              const currentCheckOut = new Date(dates[dateRangeIndex].check_out_date);
              // console.log(
              //   `comparison #${dateRangeIndex}:`,
              //   currentCheckIn,
              //   currentCheckOut,
              //   '\n\tBoolean Comparisons:',
              //   (checkInDateAsDate >= currentCheckIn && checkInDateAsDate <= currentCheckOut),
              //   (checkOutDateAsDate >= currentCheckIn && checkOutDateAsDate <= currentCheckOut),
              // );
              if (
                (checkInDateAsDate >= currentCheckIn && checkInDateAsDate <= currentCheckOut)
                || (checkOutDateAsDate >= currentCheckIn && checkOutDateAsDate <= currentCheckOut)
                || checkInDateAsDate < Date.now()
                || checkOutDateAsDate < Date.now()
              ) {
                isAvailable = false;
                // console.log(isAvailable);
                break;
              }
            }
            if (!isAvailable) {
              const err = new Error('Invalid reservation date range.\nThere is currently a booking for the dates provided, or the dates are provided are in the past.');
              callback(err);
            } else {
              // console.log('dates are available!');
              // const checkInDateFormatted = `${checkInDateAsDate.getFullYear()}-${checkInDateAsDate.getMonth() + 1}-${checkInDateAsDate.getDate()}`;
              // const checkOutDateFormatted = `${checkOutDateAsDate.getFullYear()}-${checkOutDateAsDate.getMonth() + 1}-${checkOutDateAsDate.getDate()}`;
              // const checkInDateFormatted = checkInDateAsDate.toISOString();
              // const checkOutDateFormatted = checkOutDateAsDate.toISOString();
              // console.log(checkInDate, checkOutDate);
              const queryColumns = '(listing_id, check_in_date, check_out_date, guest_adult_count, guest_children_count, guest_infant_count)';
              const queryValues = `(${listingId},'${moment(checkInDate).format()}','${moment(checkOutDate).format()}',${guestAdultCount},${guestChildrenCount},${guestInfantCount})`;
              const query = `INSERT INTO reservations ${queryColumns} VALUES ${queryValues} RETURNING confirmation_number`;
              // console.log(query);
              client.query(query, (insertReservationError, insertReservationResponse) => {
                // console.dir(insertReservationError);
                // console.dir(insertReservationResponse);
                if (insertReservationError) {
                  callback(insertReservationError);
                } else {
                  callback(insertReservationError, insertReservationResponse);
                }
              });
            }
          }
        });
      }
    }
  });
};

const patchReservation = (reservation, callback) => {
  // const {
  //   listingId,
  //   checkInDate,
  //   checkOutDate,
  //   guestAdultCount,
  //   guestChildrenCount,
  //   guestInfantCount,
  // } = reservation;
  // const query = 'MODIFY ';
  // // const values = `${},${},${},${},${}`;
  // client.query(query, ['Hello World!'], (error, response) => {
  //   callback(error, response);
  // });
};

const deleteReservation = (confirmationNumber, callback) => {
  // const query = `DELETE ${confirmationNumber}`;
  // client.query(query, ['Hello World!'], (error, response) => {
  //   callback(error, response);
  // });
};

module.exports = {
  getListing,
  getReservations,
  postReservation,
  patchReservation,
  deleteReservation,
};
