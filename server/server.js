'use strict';

//Load up modules
const express = require('express');
const daoCar = require('./dao_car');
const daoUser = require('./dao_user');
const daoRental = require('./dao_rental')
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const proposalHandler = require('./proposalHandler');


const jwtSecret = '987654321';
const expireTime = 3000; //seconds
// Authorization error
const authErrorObj = { errors: [{  'param': 'Server', 'msg': 'Authorization error' }] };

//create application
const PORT = 3001;
const app = new express();

//Process body content
app.use(express.json());


//GET /cars
app.get('/api/cars', (req, res) => {
    daoCar.getCars(req.query)
    .then((cars) => {
        res.json(cars);
    })
    .catch((err) => {
        res.status(500).json({
            errors: [{'msg' : err}],
        });
    });
});


// Authentication endpoint
app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    daoUser.getUser(username)
      .then((user) => {

        if(user === undefined) {
            res.status(404).send({
                errors: [{ 'param': 'Server', 'msg': 'Invalid e-mail' }] 
              });
        } else {
            if(!daoUser.checkPassword(user, password)){
                res.status(401).send({
                    errors: [{ 'param': 'Server', 'msg': 'Wrong password' }] 
                  });
            } else {
                //AUTHENTICATION SUCCESS
                const token = jsonwebtoken.sign({ user: user.id }, jwtSecret, {expiresIn: expireTime});
                res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1000*expireTime });
                res.json({id: user.id, email: user.email});
            }
        } 
      }).catch(
        (err) => {
          res.status(500).json({
            errors: [{'msg' : err}],
          });
        }
      );
  });

  //LOGOUT
  app.post('/api/logout', (req, res) => {
    res.clearCookie('token').end();
});

  app.use(cookieParser());

  //REST API PROTECTION
  app.use(
    jwt({
      secret: jwtSecret,
      getToken: req => req.cookies.token
    })
  );

  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json(authErrorObj);
    }
  });

//GET /user
app.get('/api/user', (req,res) => {
  const user = req.user && req.user.user;
  daoUser.getUserById(user)
      .then((user) => {
          res.json({id: user.id, email: user.email});
      }).catch(
      () => {
       res.status(401).json(authErrorObj);
      }
    );
});

//GET /proposal
app.get('/api/proposal', (req, res) => {
  const user = req.user && req.user.user;
  proposalHandler.getProposal(req.query, user)
    .then((proposal) => res.json({price: proposal.price, availableCars: proposal.availableCars}))
    .catch(err => {
      res.status(500).json({
        errors: [{'msg' : err}],});
    });
});

app.get('/api/rentals', (req, res) => {
  const user = req.user && req.user.user;
  daoRental.getRentals(user)
    .then((rentals) => res.json(rentals))
    .catch((err) => {
      res.status(500).json({
        errors:[{'msg' : err}]
      });
    });
});

app.delete('/api/rental/:rentalId', (req,res) => {
  daoRental.deleteRental(req.params.rentalId)
      .then(() => res.status(204).end())
      .catch((err) => res.status(500).json({
          errors: [{'param': 'Server', 'msg': err}],
      }));
});

//POST /rental
app.post('/api/rental', (req,res) => {
  const rental = req.body;
  if(!rental){
      res.status(400).end();
  } else {
      const user = req.user && req.user.user;
      rental.user = user;
      daoRental.createRental(rental)
          .then((id) => res.status(201).json({"id" : id}))
          .catch((err) => {
              res.status(500).json({errors: [{'param': 'Server', 'msg': err}],})
          });
  }
});

//GET /payment
app.post('/api/payment', (req, res) => {
  if(req.body.cardNumber.length != 16 || !req.body.name || req.body.CVV.length != 3) res.status(500).json({ errors: [{'param': 'Server', 'msg': 'Invalid Credit Card Data'}],})
  else res.status(204).end();
})

//activate server
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));