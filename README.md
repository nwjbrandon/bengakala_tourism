## Installation

## Setting up of front end
```
cd front-end
npm install # install dependencies
npm start
```

## Setting up of back-end
```
cd back-end
npm install # install dependencies
npm run dev
npm test # optional for unit testing
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

## References
- https://codeburst.io/getting-started-with-react-router-5c978f70df91
- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
