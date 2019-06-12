const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);
console.log(hash);
const uuidv1 = require('uuid/v1');
console.log(uuidv1());
