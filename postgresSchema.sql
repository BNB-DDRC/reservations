DROP DATABASE IF EXISTS ddrc_reservations;
CREATE DATABASE ddrc_reservations;

\c ddrc_reservations;

CREATE TABLE listings (
  -- listing_id                    serial NOT NULL          PRIMARY KEY,
  -- listing_name                  varchar(80),
  -- price                         money NOT NULL,
  -- rating                        real DEFAULT 0,
  -- review_count                  int DEFAULT 0,
  -- guest_max                     int NOT NULL,
  listing_id                    serial          PRIMARY KEY,
  listing_name                  varchar(80),
  price                         int,
  rating                        int,
  review_count                  int,
  guest_max                     int
);

CREATE TABLE reservations (
  -- confirmation_number           serial NOT NULL          PRIMARY KEY, 
  -- listing_id                    int NOT NULL             REFERENCES listings ON DELETE CASCADE, 
  -- check_in_date                 date NOT NULL, 
  -- check_out_date                date NOT NULL, 
  -- guest_adult_count             int DEFAULT 1,
  -- guest_children_count          int DEFAULT 0,
  -- guest_infant_count            int DEFAULT 0,
  confirmation_number           serial          PRIMARY KEY, 
  listing_id                    int, 
  check_in_date                 date, 
  check_out_date                date, 
  guest_adult_count             int,
  guest_children_count          int,
  guest_infant_count            int
);
