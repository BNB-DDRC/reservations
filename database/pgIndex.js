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
  const query = `SELECT * FROM listings WHERE ${queryConditional}`;
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
  // const {
  //   listingId,
  //   checkInDate,
  //   checkOutDate,
  //   guestAdultCount,
  //   guestChildrenCount,
  //   guestInfantCount,
  // } = reservation;
  // const queryColumns = '(listing_id, check_in_date, check_out_date, guest_adult_count, guest_chldren_count, guest_infant_count)';
  // const query = `INSERT INTO reservations ${queryColumns} VALUES `;
  // const values = `(${listingId},${checkInDate},${checkOutDate},${guestAdultCount},${guestChildrenCount},${guestInfantCount})`;
  // client.query(query, [values], (error, response) => {
  //   callback(error, response); // need confirmation # to send it client-side
  // });
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
