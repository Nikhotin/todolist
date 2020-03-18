const express = require('express');
const mongoose = require('mongoose');
require('./app/models');
const config = require('./config');

mongoose.set('useCreateIndex', true);

const app = express();
config.express(app);
config.routes(app);

const { appPort, mongoUri } = config.app;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(
    appPort,
    () => console.log(`Listening on port ${appPort}...`),
  ))
  .catch((err) => console.error(`Error connecting to mongo: ${appPort}`, err));
