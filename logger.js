const { createLogger, transports, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

// Define log directory and file name pattern
const logDirectory = path.join(__dirname, 'logs');
const fileNamePattern = 'application-%DATE%.log';

// Configure transports for Winston
const dailyRotateTransport = new DailyRotateFile({
  filename: path.join(logDirectory, fileNamePattern),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new transports.Console(),
    dailyRotateTransport
  ]
});

module.exports = logger;
