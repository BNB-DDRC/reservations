const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {
  getListing,
  getReservations,
  postReservation,
  patchReservation,
  deleteReservation,
} = require('../database/pgIndex.js');

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/rooms/:id', express.static(path.join(__dirname, '../public')));

app.get('/api/rooms/:id', (req, res) => {
  const listingId = req.url.match(/\/(\d+)\//)[1];
  getListing(listingId, (error, response) => {
    if (error) {
      res.status(500).send(error.stack);
    } else {
      res.status(200).send(response.rows[0]);
    }
  });
});
app.get('/api/rooms/:id/reservations', (req, res) => {
  const listingId = req.url.match(/\/(\d+)\//)[1];
  getReservations(listingId, (error, response) => {
    // console.log(response.rows);
    if (error) {
      res.status(500).send(error.stack);
    } else {
      res.status(200).send(response.rows);
    }
  });
});
// these are hidden for now as they are incomplete
app.post('/api/rooms/:id/reservations', (req, res) => {
  const listingId = req.url.match(/rooms\/(\d+)\//)[1];
  const reservation = req.body;
  reservation.listingId = listingId;
  postReservation(reservation, (error, response) => {
    if (error) {
      res.status(500).send(error.stack);
    } else {
      res.status(201).send(response.rows[0]);
    }
  });
});
app.patch('/api/rooms/:id/reservations', (req, res) => {
  const listingId = req.url.match(/\/(\d+)\//)[1];
  const reservation = req.body;
  reservation.listingId = listingId;
  patchReservation(reservation, (error, response) => {
    if (error) {
      res.status(500).send(error.stack);
    } else {
      res.status(202).send(response.rows[0]);
    }
  });
});
app.delete('/api/rooms/:id/reservations', (req, res) => {
  const listingId = req.url.match(/\/(\d+)\//)[1];
  const reservation = req.body;
  reservation.listingId = listingId;
  deleteReservation(reservation, (error, response) => {
    if (error) {
      res.status(500).send(error.stack);
    } else {
      res.status(202).send(response);
    }
  });
});

app.listen(port, () => console.log(`Server is succesfully running and listening on port ${port}!`));
