import Car from './car';

const baseURL = '/api';

//Table to map every category to a number
const filterCategoryTable = ['A', 'B', 'C', 'D', 'E'];

let brands = [];

async function getCars(filterState){
    let url = '/cars';

    //If some filter is true ask server for filtered dataset, otherwise ask for full dataset
    if(!filterState.every(f => f===false)) {
        url += "?";
        for(let i = 0; i < 5; i++){
            if(filterState[i]){
                url += "category=" + filterCategoryTable[i] + "&";
            }
        }
        for(let i = 5; i < filterState.length; i++){
            if(filterState[i]){
                url += "brand=" + brands[i-5] + "&";
            }
        }
    }
    const response = await fetch(baseURL+url);
    const carJson = await response.json();
    if(response.ok){
        const cars = carJson.map((c) => new Car(c.id, c.model, c.brand, c.category));
        if(filterState.every(f => f===false)) brands = getBrands(cars);
        return cars;
    } else {
        throw carJson;
    }
}

async function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        }).then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    resolve(user);
                });
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch(() => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch(() => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function userLogout() {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/logout', {
            method: 'POST',
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch(() => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch(() => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) });
    });
}

async function isAuthenticated(){
    let url = "/user";
    const response = await fetch(baseURL + url);
    const userJson = await response.json();
    if(response.ok){
        return userJson;
    } else {
        let err = {status: response.status, errObj:userJson};
        throw err;  // An object with the error coming from the server
    }
}

async function getProposal(rentRequest){
    let url = "/proposal";
    url += "?startDate=" + rentRequest.startDate + "&endDate=" + rentRequest.endDate
        + "&insurance=" + rentRequest.insurance + "&carCategory=" + rentRequest.carCategory
        + "&driverAge=" + rentRequest.driverAge + "&numberOfDrivers=" + rentRequest.numberOfDrivers
        + "&numberOfKm=" + rentRequest.numberOfKm;

    const response = await fetch(baseURL + url);
    const proposalJson = await response.json();
    if(response.ok){
        return proposalJson;
    } else{
        let err = {status: response.status, errObj: proposalJson};
        throw err;
    }
}

//Convert dataset of cars in dataset of unique brands
function getBrands(cars) {
    return [...new Set(cars.map((car) => {
      if(car.brand)
        return car.brand;
      else
        return null;
    }))];
  }

  async function getRentals(){
      let url = "/rentals";
      const response = await fetch(baseURL + url);
      const rentalJson = await response.json();
      if(response.ok){
          return rentalJson;
      } else {
          let err = {status: response.status, errObj: rentalJson};
          throw err;
      }
  }

  async function deleteRental(rentalId) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/rental/" + rentalId, {
            method: 'DELETE'
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( () => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( () => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function addRental(rental) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/rental", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rental),
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( () => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( () => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function checkPayment(card) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/payment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(card),
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( () => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( () => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}
            
const API = {getCars, getBrands, isAuthenticated, userLogin, userLogout, getProposal, getRentals, deleteRental, addRental, checkPayment};
export default API;