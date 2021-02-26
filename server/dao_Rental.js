'use strict';

//Load up modules
const Rental = require('./rental');
const db = require('./db');
const daoCar = require('./dao_car')

const createRental = function (row) { 
    return new Rental(row.id, row.category, row.startDate, row.endDate, row.price, row.numberOfDrivers, row.numberOfKm, row.driverAge, row.insurance);
}

exports.getRentals = function(user){

    return new Promise((resolve, reject) => {
        const query = "SELECT R.id, startDate, endDate, price, insurance, numberOfKm, numberOfDrivers, driverAge, category  FROM rentals R, cars C WHERE user = ? AND R.car = C.id";
        db.all(query, [user], (err, rows) => {
            if(err){
                reject(err);
            } else {
                const rentals = rows.map(row => createRental(row));    
                resolve(rentals);
            }
        });
    });
}

exports.deleteRental = function(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM rentals WHERE id = ?';
        db.run(sql, [id], (err) => {
            if(err)
                reject(err);
            else 
                resolve(null);
        })
    });
}

exports.createRental = function(rental) {
    return new Promise((resolve, reject) => {
        daoCar.getFirstAvailable(rental.carCategory, rental.startDate, rental.endDate).then((car) => {
        const sql = 'INSERT INTO rentals(user, car, startDate, endDate, price, insurance, numberOfKm, numberOfDrivers, driverAge) VALUES(?,?,?,?,?,?,?,?,?)';
            db.run(sql, [rental.user, car, rental.startDate, rental.endDate, rental.price, rental.insurance, rental.numberOfKm, rental.numberOfDrivers, rental.driverAge], function (err) {
                if(err){
                    reject(err);
                }
                else{
                    resolve(this.lastID);
                }
        })});
    });
}


