[![CircleCI](https://circleci.com/gh/nwjbrandon/bengkala_tourism.svg?style=svg)](https://circleci.com/gh/nwjbrandon/bengkala_tourism)

## Installation

## Install nodejs v10
- Install nodejs
```
sudo apt update
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs
```

## Setting up of front end and backend
- Setup front-end and back-end
```
npm install # install dependencies in front-end, back-end, and database
cd front-end # from root of this repo
npm run start
cd back-end # from root of this repo
npm run start
```

## Setting up of redis
- Setup of Redis on Ubuntu18
```
sudo apt-get install redis-server
sudo systemctl enable redis-server.service
```
- Setup of Redis on Windows (v3)
```
Download the zip file at https://github.com/microsoftarchive/redis/releases/tag/win-2.8.2104
Click to run redis-server.exe
```

## Setting up of database
- Set up of MySQL on Ubuntu18 ( User MySQL Workbench for easy interface )
```
sudo apt update
sudo apt install mysql-server
sudo systemctl status mysql # check whether mysql is active
```
- Refer to database directory and run the migration scripts

## Set user and password configurations
- Enter MySQL Cli
```
sudo mysql # enter mysql cli
```
- Set username and password on MySQL
```
CREATE USER 'bengkala'@'localhost' IDENTIFIED BY 'bengkala';
GRANT ALL PRIVILEGES ON * . * TO 'bengkala'@'localhost';
ALTER USER 'bengkala'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bengkala'; #for windows user
FLUSH PRIVILEGES;
```

## Setting up of Droplet
- Initial server setup guide
```
ssh root@your_server_ip # enter the password sent to gmail
adduser <user_name> # enter for defaults
usermod -aG sudo <user_name> # give all sudo priviledges
id <user_name> # check that sudo priviledges are given
```
- Setting up basic firewall
```
sudo ufw app list # output available applications
sudo ufw allow OpenSSH
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
sudo ufw status # active and allow for openssh and openssh v6
```
- To prevent root login
```
sudo vim /etc/ssh/sshd_config # change "PermitRootLogin no"
sudo service ssh restart
```
- Install software
```
sudo apt update && sudo apt upgrade
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs
sudo apt-get install build-essential
sudo npm install -g pm2 serve
```
- Setup of Repository on Digital Ocean
  - Follow the installation steps for the front-end, back-end, redis, and mysql
  - To restore mysql dump
  ```
  mysql -u bengkala -p bengkala < Dump**.sql
  ```
  
- Start back end and front end processes on pm2 ( Maybe asked to run sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u user --hp /home/user
)
```
cd back-end
pm2 start npm --name "back end" -- start
cd front-end
pm2 start npm --name "front end" -- start
pm2 save
```
- pm2 commands
```
pm2 list
pm2 delete <id>
pm2 monit
pm2 restart <id>
pm2 stop <id>
pm2 start <id>
pm2 save
```
- Setting up of SSL Certificate (Let's Encrypt)
```
sudo apt install epel-release
sudo apt install certbot
certbot certonly --standalone -d bengkala.social # prompt you to input your email address to remind you to renew
```
- Renewal of SSL Certificate
```
systemctl stop nginx # necessary to for certbot to connect to third party server
certbot renew
systemctl start nginx
```
- Setting up nginx
```
sudo vim /etc/nginx/sites-available/default
```
- Copy the following into the nginx default config for http. If you have setup ssl cert with let's encrypt, set up using the nginx config in the  devops dir.
```
. . .
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
```
sudo nginx -t # check for syntax errors
sudo systemctl restart nginx # if changes doesnt happen, just reboot as tmp solution
```
- Create a bash script 
```
touch run.sh renew.sh
sudo chmod 775 run.sh
sudo chmod 775 renew.sh 
```
- Add the following inside run.sh
```
systemctl stop nginx
git pull
pm2 update
systemctl start nginx
```
- Add the following inside renew.sh
```
systemctl stop nginx
certbot renew
systemctl start nginx
```
- Create a config file (bengkala.config) for database dump
```
[client]
user = bengkala
password = bengkala
```
- Create a CronJob
```
sudo crontab -e
```
- Add the following into the CronJob
```
0 1 * * * /usr/bin/mysqldump --defaults-extra-file=/home/bengkala/bengkala.config -u bengkala > full-backup-$(date +\%F).sql
0 0 * * 0 echo "Created SQL dump created on $(date +\%F)" >> /home/bengkala/cron.log
0 0 1 * * /bin/bash -c "/home/bengkala/renew.sh"
0 0 1 * * echo "Renewed SSL Cert from on $(date +\%F)" >> /home/bengkala/cron.log
```
## References
- https://codeburst.io/getting-started-with-react-router-5c978f70df91
- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
- https://hackernoon.com/start-to-finish-deploying-a-react-app-on-digitalocean-bcfae9e6d01b
- https://stackoverflow.com/questions/44278748/how-to-deploy-create-react-app-on-digital-ocean
- https://itnext.io/front-end-development-with-javascript-using-reactjs-redux-sass-and-webpack-1a2fdd46daba
- https://codeforgeek.com/using-redis-to-handle-session-in-node-js/
- https://medium.com/the-andela-way/how-to-set-up-an-express-api-using-webpack-and-typescript-69d18c8c4f52
- https://stackoverflow.com/questions/11804202/how-do-i-setup-a-ssl-certificate-for-an-express-js-server
- https://flaviocopes.com/express-https-self-signed-certificate/
- https://flaviocopes.com/express-letsencrypt-ssl/
- https://www.youtube.com/watch?v=d4QDyHLHZ9c&list=PLQlWzK5tU-gDyxC1JTpyC2avvJlt3hrIh&index=14
