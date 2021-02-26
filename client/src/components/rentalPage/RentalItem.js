
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import moment from 'moment';

const RentalItem = (props) => {

    let {rental} = props;
    let isRentalCurrent = moment().diff(rental.startDate, 'days') > 0 ? 0 : 1;
   
    return(
        <ListGroup.Item>
         <Row>
             <Col>{rental.category}</Col>
             <Col>{rental.startDate}</Col>
             <Col>{rental.endDate}</Col>
             <Col>{rental.price}</Col>
             <Col>{rental.numberOfDrivers}</Col>
             <Col>{rental.kilometersPerDay}</Col>
             <Col>{rental.driverAge}</Col>
             <Col>{rental.insurance}</Col>
             <Col>{!!isRentalCurrent && <Button variant = "danger" onClick = {() => props.deleteRental(rental.id)}>Delete Rental</Button>}</Col>
         </Row>
        </ListGroup.Item>
    )
}

export default RentalItem;