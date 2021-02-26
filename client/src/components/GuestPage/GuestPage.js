import React from 'react';
import API from '../../API/api';
import GuestFilters from './Filters';
import CarList from './CarList';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


class GuestPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {cars: [], brands: [], filterState: []};
      }

      componentDidMount(){
        API.getCars(this.state.filterState).then((cars) => {
          let brands = API.getBrands(cars);
          let filterState = Array(5+brands.length).fill(false);
          this.setState({cars: cars, brands: brands, filterState: filterState});
        })
        .catch((err) => this.props.handleErrors(err));
      }

      filterCars = (filterToFlip) => {
        const newFilterState = this.state.filterState;
        newFilterState[filterToFlip] = !newFilterState[filterToFlip];
        API.getCars(newFilterState)
          .then((cars) => this.setState({cars: cars, filterState: newFilterState}))
          .catch((err) => this.props.handleErrors(err));
      }


      render(){
          return(
            <Container fluid className = "mt-5 mb-3">
                <Row>
                    <Col sm={3} id="filter-panel" className='ml-3 border-right border-dark'>
                    <GuestFilters filterCars = {this.filterCars} brands = {this.state.brands}/>
                    </Col>
                    <Col sm={8} className = 'ml-5'>
                    <CarList cars = {this.state.cars}/>
                    </Col>
                </Row>
            </Container>
          );
      }
}

export default GuestPage;