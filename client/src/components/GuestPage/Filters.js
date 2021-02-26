
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

class GuestFilters extends React.Component{

    render(){
        return(
            <>
                <Row>
                  <Col>
                    <h4>Categories</h4>
                    <ToggleButtonGroup type="checkbox" className="mb-2" vertical size = 'sm'>
                        <ToggleButton className = "mb-1" value={0} onChange = {() => {this.props.filterCars(0);}}>Category A</ToggleButton>
                        <ToggleButton className = "mb-1" value={1} onChange = {() => {this.props.filterCars(1);}}>Category B</ToggleButton>
                        <ToggleButton className = "mb-1" value={2} onChange = {() => {this.props.filterCars(2);}}>Category C</ToggleButton>
                        <ToggleButton className = "mb-1" value={3} onChange = {() => {this.props.filterCars(3);}}>Category D</ToggleButton>
                        <ToggleButton className = "mb-1" value={4} onChange = {() => {this.props.filterCars(4);}}>Category E</ToggleButton>
                    </ToggleButtonGroup>
                  </Col>
                  <Col>
                    <h4>Brands</h4>
                    <ToggleButtonGroup type="checkbox" className="mb-2" vertical size = 'sm'>
                      {this.props.brands.map((brand, index) => <ToggleButton className="mb-1" value={index} key={index} onChange = {() => {this.props.filterCars(5+index);}}>{brand}</ToggleButton>)}
                    </ToggleButtonGroup>
                  </Col>
                </Row>
            </>
        );
    }
}

export default GuestFilters;