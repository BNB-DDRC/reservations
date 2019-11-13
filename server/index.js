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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/rooms/:id', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.get('/api/rooms/:id', (req, res) => {
  const listingId = req.url.match(/\/(\d)+\//)[1];
  getListing(listingId, (error, response) => {
    if (error) {
      res.status(500).send(error.stack);
    } else {
      res.status(201).send(response.rows[0]);
    }
  });
});
app.get('/api/rooms/:id/reservations', (req, res) => {
  const listingId = req.url.match(/\/(\d)+\//)[1];
  getReservations(listingId, (error, response) => {
    console.log(response.rows);
    if (error) {
      res.status(500).send(error.stack);
    } else {
      res.status(201).send(response.rows[0]);
    }
  });
});
// these are hidden for now as they are incomplete
/* app.post('/api/rooms/:id/reservations', (req, res) => {
  const listingId = req.url.match(/\/(\d)+\//)[1];
  postReservation(listingId, (error, response) => {
    if (error) {
      res.status(500).send(error.stack);
    } else {
      res.status(201).send(response.rows[0]);
    }
  });
});
app.patch('/api/rooms/:id/reservations', (req, res) => {
  const listingId = req.url.match(/\/(\d)+\//)[1];
  patchReservation(listingId, (error, response) => {
    if (error) {
      res.status(500).send(error.stack);
    } else {
      res.status(201).send(response.rows[0]);
    }
  });
});
app.delete('/api/rooms/:id/reservations', (req, res) => {
  const listingId = req.url.match(/\/(\d)+\//)[1];
  deleteReservation(listingId, (error, response) => {
    if (error) {
      res.status(500).send(error.stack);
    } else {
      res.status(201).send(response.rows[0]);
    }
  });
}); */

app.listen(port, () => console.log(`Server is succesfully running and listening on port ${port}!`));
