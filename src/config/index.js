import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Initialize dotenv
dotenv.config();

// Get current file path info (needed in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..', '..');

const config = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  },
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    receiver: process.env.EMAIL_RECEIVER,
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    dir: join(rootDir, 'logs'),
  },
  scheduler: {
    minEmailsPerDay: parseInt(process.env.MIN_EMAILS_PER_DAY, 10) || 3,
    maxEmailsPerDay: parseInt(process.env.MAX_EMAILS_PER_DAY, 10) || 5,
  },
  paths: {
    root: rootDir,
  }
};

export default config;