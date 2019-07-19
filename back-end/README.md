## Back End Setup

### Install dependencies \#
- Install node libraries
```
npm install
```
- Install redis
```
sudo apt-get install redis-server
sudo systemctl enable redis-server.service
```
- Install MySQL (MySQL Workbench is recommended for graphical interface)
```
sudo apt install mysql-server
```
- Check that redis is setup correctly
```
redis-cli
> PING #returns PONG
```
- Check that MySQL is setup correctly
```
sudo systemctl status mysql # check whether mysql is active
```

### Configure MySQL \#
- Enter MySQL Cli
```
sudo mysql
```
- Set username and password on MySQL
```
CREATE USER 'bengkala'@'localhost' IDENTIFIED BY 'bengkala';
GRANT ALL PRIVILEGES ON * . * TO 'bengkala'@'localhost';
ALTER USER 'bengkala'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bengkala'; # addtional step for windows user
FLUSH PRIVILEGES;
```

### Run Backend \#
- Obtain the secrets keys (placed inside the src/) from us or create your own
```
npm start
```

### Others
- To setup old but workable version of redis on windows <br />
  Download the zip file at https://github.com/microsoftarchive/redis/releases/tag/win-2.8.2104 <br />
  Click to run redis-server.exe
    
### References
- https://codeforgeek.com/using-redis-to-handle-session-in-node-js/
- https://medium.com/the-andela-way/how-to-set-up-an-express-api-using-webpack-and-typescript-69d18c8c4f52


