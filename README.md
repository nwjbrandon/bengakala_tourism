## Project Bali 2019

Bengkala is a village and is home to generations of deaf people.
The village has amazing stories that the rest of us can learn from. 
Under NUS Community Development Learning Programme, this project was initiated. 
<br />
<br />
The goal is to promote experiential tourism in the village and is done by promoting the village through social media and,
for this part, creating a web application to increase their digital presence.
<br />
<br />
Interested participants to continue improving the web application for the village are free to fork the repository 
and contact the village to work on (if they are still keeping the website) 

### Repository setup
- Install nodejs
```
sudo apt update
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs
```
- General Layout <br />
The repository contains the directories front-end, back-end, database, helper, and devops.
    - front-end <br />
    Source code for the front end
    - back-end <br />
    Source code for the back end
    - database <br />
    Migration scripts to manage the database and structure of the tables
    - devops <br />
    Instructions to deploy the code
    - helper <br />
    Scripts to generate uuid and hashes of text
- To setup the repository, do the following in sequential order
    1) Go to the database directory and follow the instructions with the # behind the heading
    2) Go to back-end and follow the instructions with the # behind the heading
    3) Go to the front-end and follow the instructions with the # behind the heading
- To deploy the code
    1) Go to the devops and follow the instructions with the # behind the heading