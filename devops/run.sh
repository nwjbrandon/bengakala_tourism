docker build -t nwjbrandon/testing .
docker stop test
docker rm test
docker run --name test -p 80:3000 -d nwjbrandon/testing
