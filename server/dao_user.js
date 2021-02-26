'use strict';

const User = require('./user');
const db = require('./db');
const bcrypt = require('bcrypt');

const createUser = function (row) {
    return new User(row.id, row.email, row.password);
}

exports.getUser = function (email) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE email = ?"
        db.all(sql, [email], (err, rows) => {
            if (err) 
                reject(err);
            else if (rows.length === 0)
                resolve(undefined);
            else{
                const user = createUser(rows[0]);
                resolve(user);
            }
        });
    });
  };


exports.checkPassword = function(user, password){
    return bcrypt.compareSync(password, user.password);
}

exports.getUserById = function (id) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE id = ?"
        db.all(sql, [id], (err, rows) => {
            if (err) 
                reject(err);
            else if (rows.length === 0)
                resolve(undefined);
            else{
                const user = createUser(rows[0]);
                resolve(user);
            }
        });
    });
  };

