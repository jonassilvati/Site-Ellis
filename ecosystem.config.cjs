module.exports = {
  apps: [
    {
      name: 'ellis',
      script: 'node',
      args: '--env-file=.env .output/server/index.mjs',
      cwd: '/var/www/ellisstudio.com.br',
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
