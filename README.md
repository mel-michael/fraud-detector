# Fraud Detector App

An app that help Fraud Officers see transactions and figure out if it is fraudulent or not, depending upon many different parameters.

This app was boostrapped using a simple starter with frontend using Angular 4+ and API server with NodeJS and Express framework. Typescript is configured for both Frontend and API server.

Frontend is created using angular-cli. So we can use all of the angular-cli commands from `client` folder.

This app can be used in two different ways:

1. Separate Frontend and API server.

2. Both Frontend and API served through single node server in production.


## Application Screenshot

<img src="https://github.com/mel-michael/fraud-detector/blob/master/fraud-detector-app-view.png" alt="Fraud Detector App View" />


## Technology

- NodeJS

- Angualr

- MongoDB

- Typescript

## Installation

- clone this repository

- `npm run app-install` to install all dependences

- Ensure you have Mongo installed, if not download and install [here]('https://www.mongodb.com/download-center/community')

## Commands
- Run `mongod` to get the mongo instance up and open a way for database connection.

- `npm run start`: Starts both frontend and API server as separate live reload server. Frontend uses `ng serve` underneath and API server uses `nodemon` for live reload.

- `npm run build`: Creates `dist` folder in both `client` and `server` folders.

- `npm run start:prod`: Builds the `client` and `server` projects and starts it with `NODE_ENV=production`. This by default sets `express.static` to `client/dist` to use this node server to serve frontend also.

- Visit `localhost:4200` to view the client side and `localhost:5000` for the server side.

