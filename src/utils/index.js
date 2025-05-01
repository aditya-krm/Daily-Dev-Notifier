import winston from 'winston';
import fs from 'fs';
import path from 'path';
import config from '../config/index.js';

// Ensure logs directory exists
const logsDir = config.logging.dir;
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create a date-based filename for logs
const getLogFileName = () => {
  const date = new Date();
  return path.join(logsDir, `${date.toISOString().split('T')[0]}.log`);
};

// Configure Winston logger
const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: getLogFileName(),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

function getRandomTime(minHour = 8, maxHour = 20) {
  const date = new Date();
  const hour = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour;
  const minute = Math.floor(Math.random() * 60);
  
  date.setHours(hour, minute, 0, 0);
  return date;
}

function logEmailSent(prompt, messageId) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    category: prompt.id,
    title: prompt.title,
    messageId,
  };
  
  logger.info('Email sent successfully', logEntry);
  
  // Create a specialized log file for email history
  const emailLogPath = path.join(logsDir, 'email_history.log');
  fs.appendFileSync(
    emailLogPath,
    JSON.stringify(logEntry) + '\n'
  );
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export {
  logger,
  getRandomTime,
  logEmailSent,
  getRandomItem,
};