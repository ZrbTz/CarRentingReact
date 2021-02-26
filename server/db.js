'use strict';

//Load sqlite3 module
const sqlite = require('sqlite3').verbose();

//Open db
const db = new sqlite.Database('./db/cars.db', (err) => {
   if(err){
       //Cannot open db
       console.error(err.message);
       throw err;
   }
});

module.exports = db;