module.exports = {
  apps: [
    {
      name: 'ellis',
      script: '.output/server/index.mjs',
      env_file: '.env',
      instances: 1,
      exec_mode: 'fork',
      restart_delay: 3000,
      max_restarts: 10,
      env: {
        PORT: 3003,
      },
    },
  ],
}
