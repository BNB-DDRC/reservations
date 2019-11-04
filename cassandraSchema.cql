DROP KEYSPACE IF EXISTS DDRCReservations;
CREATE KEYSPACE DDRCReservations
... with replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1,
};

USE DDRCReservations;

CREATE TABLE Listings (
  listingId                    int,
  listingName                  text,
  price                        float,
  rating                       float,
  reviewCount                  int,
  guestMax                     tinyint,
  PRIMARY KEY(listingId)
);

CREATE TABLE Reservations (
  confirmationNumber          int,
  listingId                   int,
  checkInDate                 date,
  checkOutDate                date,
  guestAdultCount             int,
  guestChildCount             int,
  guestInfantCount            int,
  PRIMARY KEY ((listingId, checkInDate), confirmationNumber)
);
