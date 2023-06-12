# PackPal API

This project is a RESTful API for managing one's travel needs/essentials.

## Installation

To install the project, you need to follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install the dependencies.
3. Create a `.env` file and configure the environment variables.
4. Run `npm start` to start the server.

## Endpoints

The following endpoints are available on the API:

- `POST /api/v1/users`: user registers.
- `POST /api/v1/users`: user login.
- `POST /api/v1/essentials/add`: user add essentials.
- `GET /api/v1/essentials/all`: user updates essentials.
- `DELETE /api/v1/essentials/:id`: user deletes essentials.
- `PUT /api/v1/essentials/:id`: user updates essentials.

## Documentation
The Project is well documented on Postman. 

This document provides a comprehensive guide to an API for user registration, login, and authentication using JSON Web Tokens (JWT). The API allows users to securely register an account, authenticate themselves with the provided credentials, and obtain a JWT token for subsequent authorized requests and perform CRUD operations.

The Publication link is blog post documentation on postman link. [Click the link to view the documentation](https://documenter.getpostman.com/view/24145860/2s93sdYXKF).


## Deployment
The backend deployed is [ on render](https://packpal-api.onrender.com). Click and use the documentation to know the routes for easy navigation.


