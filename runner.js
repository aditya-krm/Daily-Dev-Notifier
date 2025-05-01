import prompts from './prompts.js';
import { generateContent } from './geminiClient.js';
import { sendEmail } from './sendMail.js';
import { logger, getRandomItem, logEmailSent } from './utils.js';

async function runJob() {
  try {
    logger.info('Starting notification job');
    
    // Select a random prompt
    const selectedPrompt = getRandomItem(prompts);
    logger.info(`Selected prompt: ${selectedPrompt.id} - ${selectedPrompt.title}`);
    
    // Generate content using Gemini
    const htmlContent = await generateContent(selectedPrompt.prompt);
    
    // Send email with the generated content
    const result = await sendEmail(selectedPrompt.title, htmlContent);
    
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