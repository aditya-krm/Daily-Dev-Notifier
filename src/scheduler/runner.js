import prompts from '../config/prompts.js';
import { generateContent } from '../api/gemini.js';
import { sendEmail } from '../email/sender.js';
import { logger, getRandomItem, logEmailSent } from '../utils/index.js';

async function runJob() {
  try {
    logger.info('Starting notification job');
    
    // Select a random prompt
    const selectedPrompt = getRandomItem(prompts);
    logger.info(`Selected prompt: ${selectedPrompt.id} - ${selectedPrompt.title}`);
    
    // Generate content using Gemini - now returns {html, images}
    const contentWithImages = await generateContent(selectedPrompt.prompt);
    
    // Send email with the generated content and images
    const result = await sendEmail(selectedPrompt.title, contentWithImages);
    
    // Log the successful email
    logEmailSent(selectedPrompt, result.messageId);
    
    logger.info('Notification job completed successfully');
    return { success: true, promptId: selectedPrompt.id };
  } catch (error) {
    logger.error(`Job failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

export {
  runJob,
};