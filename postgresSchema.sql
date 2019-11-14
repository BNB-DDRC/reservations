DROP DATABASE IF EXISTS ddrc_reservations;
CREATE DATABASE ddrc_reservations;

\c ddrc_reservations;

CREATE TABLE listings (
  listing_id                    serial NOT NULL          PRIMARY KEY,
  listing_name                  varchar,
  price                         real NOT NULL,
  rating                        real DEFAULT 0,
  review_count                  int DEFAULT 0,
  guest_max                     int NOT NULL
);

CREATE TABLE reservations (
  confirmation_number           serial NOT NULL          PRIMARY KEY, 
  -- listing_id                    int NOT NULL             REFERENCES listings ON DELETE CASCADE, 
  listing_id                    int NOT NULL,
  check_in_date                 date NOT NULL, 
  check_out_date                date NOT NULL, 
  guest_adult_count             int DEFAULT 1,
  guest_children_count          int DEFAULT 0,
  guest_infant_count            int DEFAULT 0
);

-- CREATE INDEX listing_idx ON reservations (listing_id);
-- ALTER TABLE reservations ADD CONSTRAINT 
