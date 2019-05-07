## Installation

## Setting up of front end and backend
```
npm install # install dependencies
npm run postinstall
cd front-end
npm start
cd back-end
npm run server
```

## Setting up of database on Ubuntu 18
- Install and access MySQL
```
sudo apt update
sudo apt install mysql-server
sudo systemctl status mysql # check whether mysql is active
sudo mysql # enter mysql
```
- Set user and password configurations
```
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
FLUSH PRIVILEGES;
```

## Setting up of Droplet
- Initial server setup guide
```
ssh root@your_server_ip # enter the password sent to gmail
adduser user # enter for defaults
usermod -aG sudo user # give all sudo priviledges
```
- Setting up basic firewall
```
sudo ufw app list # output available applications
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status # active and allow for openssh and openssh v6
```
- Install software
```
sudo apt update && sudo apt upgrade
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs
sudo apt-get install build-essential
sudo apt install tmux git vim
sudo npm install -g pm2 serve
```
- Start back end on pm2
```
cd back-end
pm2 start index.js
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u user --hp /home/user
systemctl status pm2-user
```
- pm2 commands
```
pm2 list
pm2 delete id
pm2 monit
pm2 restart id
```
- Start front end on pm2 (either one)
```
pm2 start npm -- start
```
```
npm run build
pm2 serve build
```
- Setting up nginx
```
sudo nano /etc/nginx/sites-available/default
```
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
sudo systemctl restart nginx
```



## Setting up of Jenkins

## References
- https://codeburst.io/getting-started-with-react-router-5c978f70df91
- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
- https://hackernoon.com/start-to-finish-deploying-a-react-app-on-digitalocean-bcfae9e6d01b
- https://stackoverflow.com/questions/44278748/how-to-deploy-create-react-app-on-digital-ocean
