import { init } from './src/scheduler/index.js';
import { runJob } from './src/scheduler/runner.js';
import { logger } from './src/utils/index.js';

async function start() {
  try {
    logger.info('Starting daily-dev-notifier');
    
    // Initialize the scheduler
    const { scheduledTimes } = init();
    
    // Log the scheduled times
    logger.info('Scheduled notification times for today:');
    scheduledTimes.forEach((time, index) => {
      logger.info(`  ${index + 1}. ${time.toLocaleTimeString()}`);
    });
    
    logger.info('Application started successfully. Waiting for scheduled jobs to run.');
  } catch (error) {
    logger.error(`Failed to start application: ${error.message}`);
    process.exit(1);
  }
}

// If this script is run directly, start the application
if (import.meta.url === `file://${process.argv[1]}`) {
  start();
}

// For testing or manual triggering
async function manualRun() {
  logger.info('Manually triggering a notification job');
  return runJob();
}

export {
  start,
  manualRun
};