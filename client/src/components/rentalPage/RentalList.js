import React from 'react';
import RentalItem from './RentalItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import API from '../../API/api';


class RentalList extends React.Component {

    constructor(props){
        super(props);
        this.state = {rentals: []};
    }

      componentDidMount(){
            API.getRentals().then((rentals) => this.setState({rentals: rentals}))
              .catch((err) => this.props.handleErrors(err));
      }
      
      deleteRental = (rentalId) => {
        API.deleteRental(rentalId).then(() => {
            API.getRentals().then((rentals) => this.setState({rentals: rentals}))
              .catch((err) => this.props.handleErrors(err));
        })
          .catch((err) => this.props.handleErrors(err));
      }

   render(){
       return(
            <>
                <ListGroup as="ul" variant="flush">
                    <Row>
                        <Col><h5>Car Category</h5></Col>
                        <Col><h5>Start Date</h5></Col>
                        <Col><h5>End Date</h5></Col>
                        <Col><h5>Price</h5></Col>
                        <Col><h5>#Drivers</h5></Col>
                        <Col><h5>#Kilometers</h5></Col>
                        <Col><h5>Driver Age</h5></Col>
                        <Col><h5>Insurance</h5></Col>
                        <Col></Col>
                    </Row>
                    {this.state.rentals.length === 0 && <h1> No Rentals Found </h1>}
                    {this.state.rentals.map((rental) => <RentalItem key = {rental.id} rental = {rental} deleteRental = {this.deleteRental}/>)}
                </ListGroup>
            </>
        );
   }
}

export default RentalList;