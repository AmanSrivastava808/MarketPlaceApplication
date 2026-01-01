const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Setup the logger
const logger = morgan('combined', { stream: accessLogStream });

// Middleware to log errors
const errorLogger = (err, req, res, next) => {
  const errorLogStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' });
  const errorMessage = `${new Date().toISOString()} - ${err.message}\n${err.stack}\n\n`;
  errorLogStream.write(errorMessage);
  next(err);
};

module.exports = {
  logger,
  errorLogger
};