DROP KEYSPACE IF EXISTS DDRCReservations;
CREATE KEYSPACE DDRCReservations
with replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
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
  confirmationNumber          varchar,
  listingId                   int,
  checkInDate                 varchar,
  checkOutDate                varchar,
  guestAdultCount             tinyint,
  guestChildCount             tinyint,
  guestInfantCount            tinyint,
  PRIMARY KEY (listingId, confirmationNumber)
);
