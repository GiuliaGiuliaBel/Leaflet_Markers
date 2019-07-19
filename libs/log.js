const winston = require('winston');

function getLogger(module) {
  const path = module.filename.split('/').slice(-2).join('/');
  return winston.createLogger({
    transports: [
        new winston.transports.Console({
          colorize: true,
          level: 'debug',
          label: path
      }),
      new (winston.transports.File)({
          filename: 'error.log',
          label: path
      })
    ]
  });
}
  module.exports = getLogger;