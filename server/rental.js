class Rental{    
    constructor(id, category, startDate, endDate, price, numberOfDrivers, kilometersPerDay, driverAge, insurance) {
        if(id)
            this.id = id;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.numberOfDrivers = numberOfDrivers;
        this.kilometersPerDay = kilometersPerDay;
        this.driverAge = driverAge;
        this.insurance = insurance;
    }
}

module.exports = Rental;