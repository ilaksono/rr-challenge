DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS drivers;
DROP TABLE IF EXISTS suppliers;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  cust_fname VARCHAR(191) NOT NULL DEFAULT 'Anonymous',
  cust_lname VARCHAR(191) NOT NULL DEFAULT 'Customer',
  created_at TIMESTAMP NOT NULL DEFAULT Now()
);
CREATE TABLE suppliers (
  id SERIAL PRIMARY KEY NOT NULL,
  supp_fname VARCHAR(191) NOT NULL DEFAULT 'Anonymous',
  supp_lname VARCHAR(191) NOT NULL DEFAULT 'Supplier',
  created_at TIMESTAMP NOT NULL DEFAULT Now()
);
CREATE TABLE drivers (
  id SERIAL PRIMARY KEY NOT NULL,
  driver_fname VARCHAR(50) NOT NULL,
  driver_lname VARCHAR(50),
  vehicle_make VARCHAR(50),
  vehicle_model VARCHAR(50),
  vehicle_year SMALLINT,
  driver_insurance VARCHAR(191),
  is_deleted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT Now()
);

CREATE TABLE addresses (
  id SERIAL PRIMARY KEY NOT NULL,
  supplier_id INTEGER REFERENCES suppliers(id) ON DELETE CASCADE,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  address VARCHAR(191),
  city VARCHAR(50),
  state VARCHAR(50),
  postal VARCHAR(20),
  country VARCHAR(50),
  timezone_offset SMALLINT,
  created_at TIMESTAMP NOT NULL DEFAULT Now()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  cost_cents INTEGER,
  description VARCHAR(191),
  revenue_cents INTEGER,
  source_address_id INTEGER REFERENCES addresses(id) ON DELETE CASCADE,
  destination_address_id INTEGER REFERENCES addresses(id) ON DELETE CASCADE,
  driver_id INTEGER REFERENCES drivers(id) ON DELETE CASCADE,
  is_deleted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT Now()
);


