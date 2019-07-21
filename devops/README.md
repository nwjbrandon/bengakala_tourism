## Server Setup

### Setup server on DigitalOcean
- Purchase a domain from name cheap
- Go to domain list, click on manage, and then add in the nameservers 
    - ns1.digitalocean.com
    - ns2.digitalocean.com
    - ns3.digitalocean.com
- Create a droplet on DigitalOcean
    - Add domain name for your droplet
- Access your droplet
```
ssh root@your_server_ip # enter the password sent to gmail for first time only
```
- Set up firewall
```
sudo ufw app list # output available applications
sudo ufw allow OpenSSH
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
sudo ufw status # active and allow for openssh and openssh v6
```
- Install dependencies
```
sudo apt update && sudo apt upgrade
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs
sudo apt-get install build-essential
sudo npm install -g pm2 serve
sudo apt-get install nginx
```
- Setup CertBot Let's Encrypt for SSL Certificate
```
sudo apt install epel-release
sudo apt install certbot
certbot certonly --standalone -d bengkala.social # prompt you to input your email address to remind you to renew
```
- Setup nginx by copying the configuration from nginx.config into following default file
```
sudo vim /etc/nginx/sites-available/default
```
- Follow the repository setup except for the commands "npm start" to run the front end and back end
- Inside the front end
```
npm install
npm run build
pm2 start "npm run serve" --name "front-end"
```
- Inside the back end
```
npm install
pm2 start "npm run serve" --name "back-end"
```
- Renewal of SSL Certificate with by creating a bash script
```
echo "certbot renew --nginx" > renew.sh
chmod 775 renew.sh
```
- Auto Renewal with CronJob
```
sudo crontab -e
```
- Add the following into the CronJob to run at 00:00 on every Sunday
```
0 0 * * 0 /bin/bash -c "/root/renew.sh"
```

### Others
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
- nginx commands
```
nginx -t
systemctl restart nginx 
systemctl stop nginx 
systemctl start nginx 
```
## References
- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
- https://hackernoon.com/start-to-finish-deploying-a-react-app-on-digitalocean-bcfae9e6d01b
- https://stackoverflow.com/questions/44278748/how-to-deploy-create-react-app-on-digital-ocean
- https://stackoverflow.com/questions/11804202/how-do-i-setup-a-ssl-certificate-for-an-express-js-server
- https://flaviocopes.com/express-https-self-signed-certificate/
- https://flaviocopes.com/express-letsencrypt-ssl/
- https://www.youtube.com/watch?v=d4QDyHLHZ9c&list=PLQlWzK5tU-gDyxC1JTpyC2avvJlt3hrIh&index=14
