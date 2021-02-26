import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router-dom';


class Payment extends React.Component {

    constructor(props){
        super(props);
        this.state = {name: '', cardNumber: '', CVV: ''};
    }

    updateField = (name, value) => {
        this.setState({[name]: value});
      }

    handleSubmit = (event) => {
        event.preventDefault();
        let newRental = Object.assign({}, this.props.newRental);
        newRental.price = this.props.price;
        let card = Object.assign({}, this.state);
        this.props.addRental(newRental, card); 
        this.props.history.push("/rentacar")  
      }

    render(){
        return(
            <Form onSubmit = {(event) => this.handleSubmit(event)}>
                <Form.Group controlId="name" >
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" name = "name" onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}/>
                </Form.Group>

                <Form.Group controlId="cardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" name = "cardNumber" pattern = "^[0-9]*$" placeholder = "16 cifre" onChange={(ev) => this.updateField(ev.target.name, ev.target.value)} />
                </Form.Group>
                <Form.Group controlId="CVV">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control type="text" name = "CVV" pattern = "^[0-9]*$" placeholder = "3 cifre" onChange={(ev) => this.updateField(ev.target.name, ev.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }

}

export default withRouter(Payment);