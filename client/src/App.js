import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './App.css';
import API from './API/api';
import {AuthContext} from './auth/AuthContext';
import {Redirect, Route, withRouter} from 'react-router-dom';
import {Switch} from 'react-router';
import RentalList from './components/rentalPage/RentalList.js';
import RentCarPage from './components/RentCarPage/RentCarPage.js'
import GuestPage from './components/GuestPage/GuestPage.js'
import Header from './components/Header';
import LoginForm from './components/LoginForm';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {authUser: null, authErr: null};
  }

  componentDidMount(){
    API.isAuthenticated().then((user) => (this.setState({authUser: user, authErr: null})))
    .catch((err) => { 
      this.handleErrors(err);
    });
  }
   
   login = (username, password) => {
    API.userLogin(username, password)
    .then((user) => {
      this.setState({authUser: user, authErr: null});
      this.props.history.push("/rentacar");
   })
    .catch((err) => {this.setState({authErr: err.errors[0]});});
  }

  logout = () => {
    API.userLogout().then(() => {
      this.setState({authUser: null, authErr: null});
    })
    .catch((err) => this.handleErrors(err));
  }

  handleErrors(err) {
    if (err) {
        if (err.status && err.status === 401) {
          this.setState({authErr: err.errorObj});
          this.props.history.push("/carbrowser");
        }
    }
}

  render(){
    const value = {
      authUser: this.state.authUser,
      authErr: this.state.authErr,
      loginUser: this.login,
      logoutUser: this.logout
    }

      return (
        <AuthContext.Provider value={value}>

         <Header/>

          <Switch>

            <Route path="/login">
              <Container fluid className = "mt-5">
                <Row>
                <Col xs={{ span: 4, offset: 4 }} className = "mt-5">
                    <LoginForm/>
                 </Col>
                </Row>
              </Container> 
            </Route>

            <Route path="/rentacar">
              {value.authErr && <Redirect to = "/carbrowser"></Redirect>}
              <RentCarPage handleErrors = {this.handleErrors}/>
            </Route>

            <Route path="/carbrowser">
              <GuestPage handleErrors = {this.handleErrors}/>
            </Route>

            <Route path="/rentBrowser">
              <RentalList handleErrors = {this.handleErrors}/>
            </Route>

            <Route>
              <Redirect to='/rentacar'/>
            </Route>

          </Switch>
        </AuthContext.Provider>
      );
    }
  }

  export default withRouter(App);
