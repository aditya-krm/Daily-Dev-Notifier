import nodemailer from 'nodemailer';
import config from './config.js';
import { logger } from './utils.js';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: true,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

async function sendEmail(subject, content) {
  try {
    logger.info(`Sending email with subject: ${subject}`);
    
    // Prepare attachments for embedded images
    const attachments = content.images.map(image => ({
      filename: image.fileName,
      content: image.base64Data,
      encoding: 'base64',
      contentType: image.contentType,
      contentId: `${image.contentId}`, // Format contentId for email clients
      headers: {
        'Content-ID': `<${image.contentId}>`,
        'Content-Disposition': 'inline',
      },
      cid: image.contentId, // Same as the reference in the HTML
    }));
    
    // Log how many images are being attached
    if (attachments.length > 0) {
      logger.info(`Attaching ${attachments.length} images to the email`);
    }

    // Add email signature with styling
    const emailWithSignature = `
      ${content.html}
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>Sent by Daily Dev Notifier - Your personal developer knowledge assistant</p>
      </div>
    `;

    const mailOptions = {
      from: `"Daily Dev Notifier" <${config.email.user}>`,
      to: config.email.receiver,
      subject,
      html: emailWithSignature,
      attachments,
      headers: {
        'X-Priority': '1',
        'Importance': 'high',
        'X-Daily-Dev-Notifier': 'true',
      },
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw error;
  }
}

export {
  sendEmail,
};