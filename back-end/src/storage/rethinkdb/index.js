import r from 'rethinkdb';

let rethinkdbConnection;
r.connect({
  host: 'localhost',
  port: 28015,
  db: 'test',
}).then(conn => {
  rethinkdbConnection = conn;
}).error(err => {
  console.log(err);
  throw err;
});

export default rethinkdbConnection;
