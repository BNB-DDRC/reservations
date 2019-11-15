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
  const checkGuestMaxQuery = `SELECT guest_max FROM listings WHERE listing_id = ${listingId}`;
  client.query(checkGuestMaxQuery, (checkGuestMaxError, checkGuestMaxResponse) => {
    if (checkGuestMaxError) {
      callback(checkGuestMaxError);
    } else {
      const guestMax = checkGuestMaxResponse.rows[0].guest_max;
      if ((Number(guestAdultCount) + Number(guestChildrenCount)) > guestMax) {
        const err = new Error(`Invalid number of guests. This listing only allows for a maximum of ${guestMax} guests.`);
        callback(err);
      } else {
        const checkDatesQuery = `SELECT check_in_date, check_out_date FROM reservations WHERE listing_id = ${listingId}`;
        client.query(checkDatesQuery, (checkDatesError, checkDatesResponse) => {
          if (checkDatesError) {
            callback(checkDatesError);
          } else {
            let isAvailable = true;
            const dates = checkDatesResponse.rows;
            for (let dateRangeIndex = 0; dateRangeIndex < dates.length; dateRangeIndex += 1) {
              const currentCheckIn = new Date(dates[dateRangeIndex].check_in_date);
              const currentCheckOut = new Date(dates[dateRangeIndex].check_out_date);
              if (
                (checkInDateAsDate >= currentCheckIn && checkInDateAsDate <= currentCheckOut)
                || (checkOutDateAsDate >= currentCheckIn && checkOutDateAsDate <= currentCheckOut)
                || checkInDateAsDate < Date.now()
                || checkOutDateAsDate < Date.now()
              ) {
                isAvailable = false;
                break;
              }
            }
            if (!isAvailable) {
              const err = new Error('Invalid reservation date range.\nThere is currently a booking for the dates provided, or the dates are provided are in the past.');
              callback(err);
            } else {
              const queryColumns = '(listing_id, check_in_date, check_out_date, guest_adult_count, guest_children_count, guest_infant_count)';
              const queryValues = `(${listingId},'${moment(checkInDate).format()}','${moment(checkOutDate).format()}',${guestAdultCount},${guestChildrenCount},${guestInfantCount})`;
              const query = `INSERT INTO reservations ${queryColumns} VALUES ${queryValues} RETURNING confirmation_number`;
              client.query(query, (insertReservationError, insertReservationResponse) => {
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

const patchReservation = (newReservation, callback) => {
  const {
    confirmationNumber,
    listingId,
    checkInDate,
    checkOutDate,
    guestAdultCount,
    guestChildrenCount,
    guestInfantCount,
  } = newReservation;
  const columnsToChange = [];
  if (checkInDate) columnsToChange.push(`check_in_date = '${moment(checkInDate).format()}'`);
  if (checkOutDate) columnsToChange.push(`check_out_date = '${moment(checkOutDate).format()}'`);
  if (guestAdultCount) columnsToChange.push(`guest_adult_count = ${guestAdultCount}`);
  if (guestChildrenCount) columnsToChange.push(`guest_children_count = ${guestChildrenCount}`);
  if (guestInfantCount) columnsToChange.push(`guest_infant_count = ${guestInfantCount}`);
  // console.log(columnsToChange);

  client.query(`SELECT guest_max FROM listings WHERE listing_id = ${listingId}`, (guestMaxError, guestMaxResponse) => {
    const guestMax = guestMaxResponse.rows[0].guest_max;
    // console.log(guestMax);
    if (guestMaxError) {
      return callback(guestMaxError);
    }
    client.query(`SELECT * FROM reservations WHERE listing_id = ${listingId}`, (reservationError, reservationResponse) => {
      const confirmationNumberAsNumber = Number(confirmationNumber);
      const reservations = reservationResponse.rows;
      if (reservationError) return callback(reservationError);
      let currentReservation;
      reservations.forEach((reservation) => {
        if (reservation.confirmation_number === Number(confirmationNumberAsNumber)) currentReservation = reservation;
      });
      if (guestAdultCount || guestChildrenCount) {
        const newAdultCount = guestAdultCount || currentReservation.guest_adult_count;
        const newChildrenCount = guestAdultCount || currentReservation.guest_children_count;
        if (newAdultCount + newChildrenCount > guestMax) {
          const err = new Error(`Invalid number of guests. This listing only allows for a maximum of ${guestMax} guests.`);
          return callback(err);
        }
      }
      const checkInDateAsDate = !checkInDate || new Date(checkInDate);
      const checkOutDateAsDate = !checkOutDate || new Date(checkOutDate);
      if (checkInDate || checkOutDate) {
        for (let reservationIndex = 0; reservationIndex < reservations.length; reservationIndex += 1) {
          const currentCheckIn = new Date(reservations[reservationIndex].check_in_date);
          const currentCheckOut = new Date(reservations[reservationIndex].check_out_date);

          const isInvalidCheckIn = (
            !checkInDate ? false : (
              checkInDateAsDate >= currentCheckIn && checkInDateAsDate <= currentCheckOut
            )
          );
          const isInvalidCheckOut = (
            !checkOutDate ? false : (
              checkOutDateAsDate >= currentCheckIn && checkOutDateAsDate <= currentCheckOut
            )
          );
          const isCheckInTooOld = !checkInDate ? false : checkInDateAsDate < Date.now();
          const isCheckOutTooOld = !checkOutDate ? false : checkOutDateAsDate < Date.now();
          if (
            reservations[reservationIndex].confirmation_number !== confirmationNumberAsNumber
            && (isInvalidCheckIn || isInvalidCheckOut || isCheckInTooOld || isCheckOutTooOld)
          ) {
            const err = new Error('Invalid reservation date range.\nThere is currently a booking for the dates provided, or the dates are provided are in the past.');
            return callback(err);
          }
        }
        const queryConditional = `listing_id = ${listingId} AND confirmation_number = ${confirmationNumberAsNumber}`;
        const query = `UPDATE reservations SET ${columnsToChange.join(', ')} WHERE ${queryConditional} RETURNING *`;
        client.query(query, (patchError, patchResponse) => {
          if (patchError) return callback(patchError);
          return callback(patchError, patchResponse);
        });
      }
    });
  });
};

const deleteReservation = (reservationToDelete, callback) => {
  const { listingId, confirmationNumber } = reservationToDelete;
  const queryConditional = `listing_id = ${listingId} AND confirmation_number = ${confirmationNumber}`;
  const query = `DELETE FROM reservations WHERE ${queryConditional} RETURNING confirmation_number`;
  client.query(query, (error, response) => {
    if (error) return callback(error);
    return callback(error, `Reservation ${response.rows[0].confirmation_number} was successfully deleted.`);
  });
};

module.exports = {
  getListing,
  getReservations,
  postReservation,
  patchReservation,
  deleteReservation,
};
