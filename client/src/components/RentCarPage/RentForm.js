import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Payment from './Payment';
import {Route, withRouter} from 'react-router-dom';
import {Switch} from 'react-router';
import moment from 'moment';


class RentForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {startDate: '', endDate: '', insurance: false, carCategory: 'A', driverAge: '', numberOfDrivers: '', numberOfKm: '', valid: false};
    }

    componentDidUpdate(){
        if(this.state.valid){
            let rentRequest = Object.assign({}, this.state);
            this.props.getRentalProposal(rentRequest);
            this.setState({valid: false});
        }
    }

    handleChange = (event) => {
        const form = event.currentTarget;
        if(!form.checkValidity()){
             form.reportValidity();
             this.setState({valid: false});
        }else{
            this.setState({valid: true});
        }
        
    }

    updateField = (name, value) => {
        this.setState({[name]: value});
    }


    handleSubmit = (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          if(form.checkValidity() && this.props.cars > 0){
              this.props.history.push('/rentacar/payment');
          }
      }

    render(){
        return(
            <>
            <Switch>
                <Route path = "/rentacar/payment">
                    <Payment addRental = {this.props.addRental} newRental = {this.state} price = {this.props.price}/>
                </Route>
                <Route path = "/rentacar">
                    <Form onChange = {(event) => this.handleChange(event)} onSubmit = {(event) => this.handleSubmit(event)}>
                    <Row>
                        <Col>
                            <Form.Group controlId="Start-date">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control required type="date" name="startDate" min={moment().add(1, 'days').format("YYYY-MM-DD")} max = {this.state.endDate} value = {this.state.startDate} onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="End-date">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control required type="date" name="endDate"  min={this.state.startDate} value = {this.state.endDate} onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}/>
                            </Form.Group>
                        </Col>
                            <Form.Group controlId="Insurance">
                                <Form.Check className = "mt-5 mr-2" type="checkbox" name="insurance" value = {this.state.insurance} label="Insurance"  onChange={(ev) => this.updateField(ev.target.name, ev.target.checked)}/>
                            </Form.Group>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="Car-Category">
                                <Form.Label>Car Category</Form.Label>
                                <Form.Control required as="select" custom name="carCategory" value = {this.state.carCategory} onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                    <option>D</option>
                                    <option>E</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId = "Driver-Age">
                                <Form.Label>Driver's Age</Form.Label>
                                <Form.Control required size="md" placeholder = "18" min="18" type="number" name="driverAge"  value = {this.state.driverAge} onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId = "Number-of-Drivers">
                                <Form.Label>#Drivers</Form.Label>
                                <Form.Control required size="md"  placeholder = "1" min="1" type="number" name="numberOfDrivers" value = {this.state.numberOfDrivers} onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId = "Number-of-Kilometers">
                                <Form.Label>#Kilometers</Form.Label>
                                <Form.Control required size="md" placeholder = "1" min="1" type="number" name="numberOfKm" value = {this.state.numberOfKm} onChange={(ev) => this.updateField(ev.target.name, ev.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                        </Col>
                    </Row>
                    <Row>
                        {!!this.props.cars && <Button variant="primary" type="submit">Submit</Button>}  
                    </Row>
                    </Form>
                </Route>
            </Switch>
            </>



        )
    }






}

export default withRouter(RentForm);