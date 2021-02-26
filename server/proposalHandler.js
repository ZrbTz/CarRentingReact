'use strict';

const moment = require('moment');
const db = require('./db');
const priceTable = {A: 80, B: 70, C: 60, D: 50, E: 40};


exports.getProposal = function(query, user){

    return new Promise((resolve, reject) => {
        Promise.all([countUserRentals(user), countAvailableCars(query.carCategory, query.startDate, query.endDate), countCarsOfCategory(query.carCategory)])
            .then((values) => resolve({price: computePrice(values[0], values[1], values[2], query), availableCars: values[1]}))
            .catch((err) => reject(err));
    });
}

const countAvailableCars = function(carCategory, startDate, endDate){
    return new Promise((resolve, reject) => {
        const query = "SELECT COUNT(*) as availableCars FROM cars WHERE category = ? AND id NOT IN (SELECT car FROM rentals WHERE startDate <= ? AND endDate >= ?)";
        db.get(query, [carCategory, endDate, startDate], (err, row) => {
            if(err){
                reject(err);
            } else{
                resolve(row.availableCars);
            }
        }
    )});
}

const countUserRentals = function(id){
    return new Promise ((resolve, reject) => {
        const sql = "SELECT COUNT(*) as userRentals FROM rentals WHERE user = ? AND endDate < ?";
        db.get(sql, [id, moment().format("YYYY-MM-DD")], (err, row) => {
            if(err){
              reject(err);
            }else{
                resolve(row.userRentals);
            }
        })
    })
}

const countCarsOfCategory = function(category){
    return new Promise((resolve, reject) => {
        const sql = "SELECT COUNT(*) as countCar FROM cars WHERE category = ?";
        db.get(sql, [category], (err, row) => {
            if(err){
                reject(err);
            } else {
                resolve(row.countCar);
            }
        })
    })
}

const computePrice = function(userRentals, availableCars, totalCars, query){
    //Set base price
    let price = priceTable[query.carCategory];

    price *= (moment(query.endDate).diff(moment(query.startDate), 'days') + 1);
    
    if(query.numberOfKm < 50) price *= (1-5/100);
    else if(query.numberOfKm > 150) price *= (1+5/100);
    
    if(query.driverAge < 25) price *= (1+5/100);
    else if(query.driverAge > 65) price *= (1+10/100);

    if(query.numberOfDrivers > 1) price *= (1+15/100);
    
    if(query.insurance === "true") price *= (1+20/100);
   
    if(userRentals >= 3) price *= (1-10/100);

    if(availableCars/totalCars < 0.10) price *= (1+10/100);

    return Math.round(price);
}



