'use strict';

//Load up modules
const Car = require('./car');
const db = require('./db');


//Create a car object from a row of the db
const createCar = function(row){
    return new Car(row.id, row.model, row.brand, row.category);
}

exports.getCars = function(queryURL){

    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM cars";
        db.all(query, [], (err, rows) => {
            if(err){
                reject(err);
            } else {
                let cars = rows.map(row => createCar(row));
                const categories = queryURL.category;
                const brands = queryURL.brand;

                if(categories){
                    cars = cars.filter(c => categories.includes(c.category));
                }

                if(brands){
                    cars = cars.filter(c => brands.includes(c.brand));
                }
                
                resolve(cars);
            }
        });
    });
}

exports.getFirstAvailable = function(category, startDate, endDate){
    return new Promise((resolve, reject) => {
        const query = "SELECT id FROM cars WHERE category = ? AND id NOT IN (SELECT car FROM rentals WHERE startDate <= ? AND endDate >= ?)"
        db.get(query, [category, endDate, startDate], (err, row) => {
            if(err){
                reject(err);
            } else {
                resolve(row.id);
            }
        })
    })
}



