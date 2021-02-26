
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CarItem = (props) => {

    let {car} = props;
   
    return(
        <ListGroup.Item>
         <Row>
             <Col>{car.model}</Col>
             <Col>{car.brand}</Col>
             <Col>{car.category}</Col>
         </Row>
        </ListGroup.Item>
    )
}

export default CarItem;