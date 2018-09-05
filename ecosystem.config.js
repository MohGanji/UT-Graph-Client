module.exports = {
  apps: [{
    name: 'UT-Graph-Client',
    script: 'npm',
    args: 'run start:production',
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {},
    staging: {
      user: 'root',
      host: '188.166.114.43',
      ref: 'origin/master',
      repo: 'git@github.com:MohGanji/UT-Graph-Client.git',
      path: '/var/www/UT-Graph-Client-Development',
      key: '~/.ssh/id_rsa',
      ssh_options: ['ForwardAgent=yes'],
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    },
  }
};

