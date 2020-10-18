# urban backend

clone the git repository

RENAME .env-example file to .env

CHANGE googleMapAPI in the .env file to a valid googlemap API key.

INPUT correct REDIS HOST IP if not running on localhost.

RUN "npm install"

RUN "npm run start" to start the server.

# API ENDPOINT

API DOCUMENTATION: https://documenter.getpostman.com/view/5289516/TVRrWQZY

URL: 127.0.0.1:3000/api/district

Req.body: {
'address': '4 Colebrooke Row, London'
}
