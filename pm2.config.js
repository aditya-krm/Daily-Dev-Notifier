export default {
  apps: [
    {
      name: 'daily-dev-notifier',
      script: 'index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: 'logs/pm2-error.log',
      out_file: 'logs/pm2-output.log',
      node_args: ['--experimental-json-modules'], // Add support for JSON modules if needed
    },
  ],
};