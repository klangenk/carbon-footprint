# Carbon Footprint Comparison

## Description

This project contains an API and frontend for a comparison between different means of transport.

The results are based on:
https://www.umweltbundesamt.de/bild/vergleich-der-durchschnittlichen-emissionen-0 and
https://api.goclimateneutral.org/docs

## Installation

```bash
$ cd backend
$ npm i
$ cd ../frontend
$ npm i
```

Missing variables in the .env files have to be filled

## Running the backend

```bash
$ cd backend

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The backend runs on port 3001

## Running the frontend

```bash
$ cd frontend

# development
$ npm run start

# build
$ npm run build
```

Open http://localhost:3000 for the frontend or http://localhost:3001/api for the api definition