import cron from 'node-cron';
import { runJob } from './runner.js';
import { logger, getRandomTime } from '../utils/index.js';
import config from '../config/index.js';

// Store active cron jobs
let activeJobs = [];

function scheduleJobs(numJobs) {
  try {
    logger.info(`Scheduling ${numJobs} notification jobs for today`);
    
    // Clear any existing jobs
    clearJobs();
    
    const scheduledTimes = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Business hours: 8 AM to 8 PM
    const minHour = 8;
    const maxHour = 20;
    
    // Generate random times for today
    for (let i = 0; i < numJobs; i++) {
      const jobTime = getRandomTime(minHour, maxHour);
      
      // Skip if time is in the past
      const now = new Date();
      if (jobTime < now) {
        logger.info(`Skipping job ${i+1} - time ${jobTime.toLocaleTimeString()} is in the past`);
        continue;
      }
      
      scheduledTimes.push(jobTime);
      
      // Format time for cron
      const hours = jobTime.getHours();
      const minutes = jobTime.getMinutes();
      
      // Schedule the job
      const cronExpression = `${minutes} ${hours} * * *`;
      logger.info(`Scheduling job ${i+1} at ${jobTime.toLocaleTimeString()} (${cronExpression})`);
      
      const job = cron.schedule(cronExpression, async () => {
        logger.info(`Running scheduled job at ${new Date().toLocaleTimeString()}`);
        await runJob();
      });
      
      activeJobs.push(job);
    }
    
    // Sort scheduled times chronologically
    scheduledTimes.sort((a, b) => a - b);
    
    logger.info(`Successfully scheduled ${scheduledTimes.length} jobs for today`);
    return scheduledTimes;
  } catch (error) {
    logger.error(`Error scheduling jobs: ${error.message}`);
    throw error;
  }
}

function clearJobs() {
  logger.info(`Clearing ${activeJobs.length} active jobs`);
  activeJobs.forEach(job => job.stop());
  activeJobs = [];
}

function scheduleDailySetup() {
  // At midnight every day, schedule a random number of jobs for the day
  const midnightJob = cron.schedule('0 0 * * *', () => {
    const numJobs = Math.floor(
      Math.random() * 
      (config.scheduler.maxEmailsPerDay - config.scheduler.minEmailsPerDay + 1)
    ) + config.scheduler.minEmailsPerDay;
    
    logger.info(`Setting up ${numJobs} jobs for the new day`);
    scheduleJobs(numJobs);
  });
  
  return midnightJob;
}

function init() {
  logger.info('Initializing scheduler');
  
  const numJobs = Math.floor(
    Math.random() * 
    (config.scheduler.maxEmailsPerDay - config.scheduler.minEmailsPerDay + 1)
  ) + config.scheduler.minEmailsPerDay;
  
  // Schedule jobs for today
  const scheduledTimes = scheduleJobs(numJobs);
  
  // Also set up the midnight job for subsequent days
  const midnightJob = scheduleDailySetup();
  
  return {
    scheduledTimes,
    midnightJob
  };
}

export {
  init,
  scheduleJobs,
  clearJobs
};