## **BNB-DDRC Reservations**
### Reservations module for the BNB-DDRC Project based off of the _[**Hack Reactor @ Galvanize** Software Engineering Immersive](https://www.hackreactor.com/)_ curriculum
---

Related Projects/Modules:

 - [BNB-DDRC Gallery Module](https://github.com/BNB-DDRC/photo-gallery)
 - [BNB-DDRC Calendar Module](https://github.com/BNB-DDRC/calendar)
 - [BNB-DDRC Reservations Module](https://github.com/BNB-DDRC/reservations) _(This Module)_
 - [BNB-DDRC Reviews Module](https://github.com/BNB-DDRC/reviews)

## **Getting Started**
---

### Install Module Dependencies:
 - From within the main directory, run the `npm install` command
    ```sh
    ~/.../reservations$ npm install
    ```
### Initialize the Database
 - Duplicate the `mySQL.example.config.js` file
 - Rename the newly copied file to `mySQL.config.js`
 - Within the `mySQL.config.js` file insert your mySQL root user password as the value of the `MYSQL_USER_PASSWORD` variable (if there is no root user password leave the value as an empty string)
 - Run the `schema` npm script 
    ```sh
    ~/.../reservations$ npm run schema
    ```
   - _A password prompt should appear, press enter if there is no user password, or fill in the password and press enter_
 - Run the `seed` npm script
    ```sh
    ~/.../reservations$ npm run seed
    ```
   - _Once the operations have finished, press `ctrl+c` to stop the script and return control to the command line_

### Build the Application
 - Run the `build` npm script
  ```sh
  ~/.../reservations$ npm run build
  ```

### Start the Server
 - Run the `start` npm script
    ```sh
    ~/.../reservations$ npm start
    ```

At this point in time, the module dependencies should be installed, the mySQL database should have its schema inserted and sample data seeded, the front-end build should be transpiled and bundled, and the server should be operational standing by for requests.

In order to view the module in action, visit the following URL:
```js
// replace '#' with a number 1 - 100
'http://localhost:3002/rooms/#/'
```

## **API Access and Routing**
---
This module's API provides access to information via the following request methods:

#### _LISTING INFORMATION_
  Listing information is available via a `GET` request to the following URL:
  ```js
  'http://localhost:3002/api/rooms/:id'
  ```

  _Sample jQuery ajax GET request for information on listing #56:_
  ```js
  $.ajax({
    url: 'http://localhost:3002/api/rooms/56',
    method: 'GET',
    });
  ```

  Requests to the above URL will be provided with a JSON object which follows the below data shape:

  ```json
  {
    "id": "56",
    "createdAt": "2019-10-31T04:53:25.000Z",
    "updatedAt": "2019-10-31T04:53:25.000Z",
    "pricePerNight": "345",
    "ratings": "3.50",
    "reviews": "330",
    "serviceFee": "58",
    "maxGuest": "10",
    "lowerBoundGuestNum": "2"
  }
  ```
  ##### _Successful requests will receive a `202` HTTP status code._

#### _CURRENT RESERVATION DATES_  
  Current reservation dates are available via a `GET` request to the following URL:
  ```js
  'http://localhost:3002/api/rooms/:id/dates'
  ```

  _Sample jQuery ajax GET request for reservation dates from listing #56:_
  ```js
  $.ajax({
    url: 'http://localhost:3002/api/rooms/56/dates',
    method: 'GET',
    });
  ```
  Requests to the above URL will be provided with a JSON object which follows the below data shape:
  ```json
  {
    "id": "56",
    "listingId": "",
    "createdAt": "2019-10-31T04:53:25.000Z",
    "updatedAt": "2019-10-31T04:53:25.000Z",
    "october1": "true",
    "october2": "true",
    "october3": "false",
    "october4": "true",
        ︙
    "october31": "false",
  }
  ```
  ##### _Successful requests will receive a `202` HTTP status code._

#### _NEW RESERVATION SUBMISSIONS_  
  New reservation submissions can be made via a `POST` request to the below URL; accompanied by a data object containing the guest name, confirmation number, and the check-in and check-out dates of the reservation.

  _Sample jQuery ajax POST request for a new reservation to listing #56:_
  ```js
  $.ajax({
    url: 'http://localhost:3002/api/rooms/56/dates',
    method: 'POST',
    data: {
      guestName: "David J",
      confirmationNumber: 000001,
      checkInDate: "2019-12-29",
      checkOutDate: "2020-01-02",
    }
    });
  ```
  ##### _Successful requests will receive a `201` HTTP status code._

#### _CURRENT RESERVATION MODIFICATION_
  Reservation modifications can be made via a `PATCH` request to the below URL; accompanied by a data object containing the guest name, the confirmation number, and the new check-in and check-out dates of the reservation.

  _Sample jQuery ajax PATCH request for a reservation modification to listing #56:_
  ```js
  $.ajax({
    url: 'http://localhost:3002/api/rooms/56/dates',
    method: 'PATCH',
    data: {
      guestName: "David J",
      confirmationNumber: 000001,
      checkInDate: "2019-12-31",
      checkOutDate: "2020-01-01",
    }
    });
  ```
  ##### _Successful requests will receive a `202` HTTP status code._

  #### _CURRENT RESERVATION CANCELLATION_
  Reservation cancellations can be made via a `DELETE` request to the below URL; accompanied by a data object containing the guest name and the confirmation number.

  _Sample jQuery ajax DELETE request for a reservation cancellation to listing #56:_
  ```js
  $.ajax({
    url: 'http://localhost:3002/api/rooms/56/dates',
    method: 'DELETE',
    data: {
      guestName: "David J",
      confirmationNumber: 000001,
    }
  });
  ```
  ##### _Successful requests will receive a `202` HTTP status code._
