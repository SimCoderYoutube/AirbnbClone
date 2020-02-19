const Sentry = require('@sentry/node');

// Libraries
const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

const path = require('path');
const config = require('./config/env');


// Connection to DB

const options = {
  dbName: config.db_name,
  user: config.db_user,
  pass: config.db_pass,
  useNewUrlParser: true,
  useCreateIndex: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
  useUnifiedTopology: true,
};

// server configuration
const basePath = '/';
const port = process.env.PORT || config.port;

const connectionUri = config.db_uri || `mongodb+srv://${config.db_host}:${config.db_port}`;
mongoose.connect(connectionUri, options)
  .then(() => {
    console.log('Backend Started');
  })
  .catch((err) => {
    console.error('Backend error:', err.stack);
    process.exit(1);
  });

// App Instance
const app = express();

Sentry.init({ dsn: 'https://e93f4a23ac5d4bd692591ae1acb8adf0@sentry.io/1795620' });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(express.static(path.join(__dirname, '../public/react-build')));

// Routes and Backend Functionalities
const routes = require('./routes/routes');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(basePath, routes);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use((err, req, res) => {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  // res.end(`${res.sentry}\n`);
});

// Execute App
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log('AreYouOk Backend running on Port: ', port);
  });
}
