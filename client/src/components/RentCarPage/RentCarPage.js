import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import API from '../../API/api';
import RentForm from './RentForm';
import PriceResult from './PriceResult';



class RentCarPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {availableCars: '', price: ''};
      }

    addRental = (rental, card) => {
        API.checkPayment(card).then(() => 
          API.addRental(rental).then(() => this.setState({availableCars: '', price: ''}))
              .catch((err) => this.props.handleErrors(err)))
            .catch((err) => this.props.handleErrors(err));
    }

    getRentalProposal = (rentRequest) => {
        API.getProposal(rentRequest).then((proposal) => this.setState({price: proposal.price, availableCars: proposal.availableCars}))
        .catch((err) => this.props.handleErrors(err));
    }

    render(){
        return(
            <Container fluid className = "mt-5 mb-3">
                  <Row>
                      <Col sm={5} id="filter-panel" className='ml-3 border-right border-dark'>
                        <RentForm getRentalProposal = {this.getRentalProposal} cars = {this.state.availableCars} addRental = {this.addRental} price = {this.state.price}/>
                      </Col>
                      <Col sm={5} className = 'ml-5'>
                        <PriceResult cars = {this.state.availableCars} price= {this.state.price}/>
                      </Col>
                  </Row>
              </Container>
        );
    }
}

export default RentCarPage;