# Daily Dev Notifier

A Node.js application that sends scheduled, randomized developer insights and tips via email using Google's Gemini AI.

## Features

- Sends daily notifications with developer insights, tips, and career advice
- Uses Google's Gemini AI to generate high-quality, relevant content
- Randomized scheduling throughout the day during business hours
- Configurable via environment variables
- Comprehensive logging system
- Designed for long-running deployment with PM2

## Setup

1. Clone the repository
    ```
    git clone https://github.com/aditya-krm/Daily-Dev-Notifier.git
    ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your configuration (see `.env.example`)
4. Run the application:
   ```
   npm start
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| GEMINI_API_KEY | Your Google Gemini API key | (required) |
| EMAIL_USER | Email sender address | (required) |
| EMAIL_PASSWORD | Email sender password | (required) |
| EMAIL_HOST | SMTP host | (required) |
| EMAIL_PORT | SMTP port | (required) |
| EMAIL_RECEIVER | Email receiver address | (required) |
| LOG_LEVEL | Winston log level | info |
| MIN_EMAILS_PER_DAY | Minimum emails per day | 3 |
| MAX_EMAILS_PER_DAY | Maximum emails per day | 5 |

## Scripts

- `npm start` - Start the application
- `npm run dev` - Start with nodemon for development
- `npm run manual` - Manually trigger a single notification
- `npm run start:pm2` - Start with PM2 process manager
- `npm run stop:pm2` - Stop the PM2 process
- `npm run logs` - View PM2 logs

## Content Categories

The application randomly selects from these content categories:

- 🔍 Dev Insight or Tip of the Day
- ⚛️ React/Next.js/Node/PostgreSQL/DevOps tip
- 🤖 Web or AI trend/tool
- 🧠 Soft skill or focus hack
- 🛠️ Blog post-style write-up from a top company
- 📈 Career or job-prep tip
- 💡 Motivation, quote, or real dev story

You can twick anyting inside `prompt.js`
## License

ISC