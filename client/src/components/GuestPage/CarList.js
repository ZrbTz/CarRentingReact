import React from 'react';
import CarItem from './CarItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CarList = (props) => {

    let {cars} = props;

   return(
        <>
            <ListGroup as="ul" variant="flush">
                <Row>
                    <Col><h5>Model</h5></Col>
                    <Col><h5>Brand</h5></Col>
                    <Col><h5>Category</h5></Col>
                </Row>
                {cars.length === 0 && <h1> No car found </h1>}
                {cars.map((car) => <CarItem key = {car.id} car = {car}/>)}
            </ListGroup>
        </>
        );
}

export default CarList;