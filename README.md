<!-- ABOUT THE PROJECT -->
## About The Project

The simple e-commerce application aims to provide a convenient platform for users to browse, select, and purchase products. It focuses on delivering a seamless shopping experience through robust backend functionalities.

### Solution Design

1. Modular Architecture:
    * Separation of Concerns: The application is designed with a clear separation between different layers such as configurations, helpers, models, migrations, controllers, and routes. This modular approach improves maintainability.
    * Reusable Components: Common functionalities, like pagination, are implemented as reusable components, making it easier to extend the application with new features.
2. RESTful API:
    * ExpressJS: Utilized to create a RESTful API for managing products, and transactions. This allows for easy integration with front-end applications and other external services.
    * Standard HTTP Methods: Followed REST conventions using standard HTTP methods (GET, POST, PUT, DELETE) for CRUD operations, ensuring a consistent and intuitive API design.
3. Database Schema Design:
    * Normalized Database: The database schema is normalized to minimize redundancy and ensure data integrity. Tables for products, reviews, tags, transactions, dimensions, images and metas.

### Built With

The library application created with some technologies, such as:

* [![NodeJS][NodeJS]][NodeJS-url]
* [![HapiJS][HapiJS]][HapiJS-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![Swagger][Swagger]][Swagger-url]


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Before running the library management application, make sure you have installed some of the tools below, because I use the Linux operating system, I will give an example using Linux.
* Node v18.20.2
  ```sh
  nvm install v18.20.2
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Galuh80/jubelio-assesment.git
   ```
2. Move to directory
   ```sh
   cd jubelio-assesment
   ```
3. Install packages
   ```sh
   npm install
   ```
4. Copy .env.example to .env and configure it
   ```sh
   DB_HOST=your-host
   DB_NAME=your-database
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_PORT=your-database-port
   ```
6. Configure database.json
   ```sh
   {
      "dev": {
          "driver": "your driver",
          "host": "your host",
          "user": "your database user ",
          "password": "your database password",
          "database": "your database",
          "port": "your database port"
      }
   }
   ```

<!-- USAGE EXAMPLES -->
## Usage

1. Database migrate
   ```sh
   db-migrate up
   ```
2. Run application
   ```sh
   npx nodemon app
   ```
3. Run swagger
   ```sh
   http://localhost:PORT/documentation
   ```

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[NodeJS]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en
[HapiJS]: https://img.shields.io/badge/hapi-%5E20.0.0-brightgreen.svg
[HapiJS-url]: https://hapi.dev/
[PostgreSQL]: https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Swagger]: https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white
[Swagger-url]: https://swagger.io/
