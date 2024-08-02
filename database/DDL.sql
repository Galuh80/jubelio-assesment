-- Create the database user
CREATE USER jubelio_user WITH PASSWORD 'jubelio_pass';

-- Create the database
CREATE DATABASE db_jubelio_assessment;

-- Connect to the database
\c db_jubelio_assessment;

-- Create the database privileges
GRANT ALL PRIVILEGES ON DATABASE db_jubelio_assesment TO jubelio_user;

-- Create the products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    price DECIMAL(10, 2),
    discount_percentage DECIMAL(5, 2),
    rating DECIMAL(3, 2),
    stock INT,
    brand VARCHAR(100),
    sku VARCHAR(50),
    weight DECIMAL(10, 2),
    warranty_information TEXT,
    shipping_information TEXT,
    availability_status VARCHAR(50),
    return_policy TEXT,
    minimum_order_quantity INT,
    thumbnail VARCHAR(255)
);

-- Create the tags table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    tag VARCHAR(50)
);

-- Create the reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    rating INT,
    comment TEXT,
    date TIMESTAMP,
    reviewer_name VARCHAR(100),
    reviewer_email VARCHAR(100)
);

-- Create the images table
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url VARCHAR(255)
);

-- Create the dimensions table
CREATE TABLE dimensions (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    width DECIMAL(10, 2),
    height DECIMAL(10, 2),
    depth DECIMAL(10, 2)
);

-- Create the metas table
CREATE TABLE metas (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    barcode VARCHAR(50),
    qr_code VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE products TO jubelio_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE tags TO jubelio_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE reviews TO jubelio_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE images TO jubelio_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE dimensions TO jubelio_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE metas TO jubelio_user;
