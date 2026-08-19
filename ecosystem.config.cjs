module.exports = {
    apps: [
        {
            name: 'personal-finance-backend',

            script: './dist/app.js',
            interpreter: 'bun',

            instances: 1,
            exec_mode: 'fork',

            max_memory_restart: '300M',

            autorestart: true,
            watch: false,

            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            error_file: './logs/pm2-error.log',
            out_file: './logs/pm2-out.log',
            combine_logs: true,
        },
    ],
};