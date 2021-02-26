import React from 'react';


const PriceResult = (props) => {
    return(
        <>
            {!!props.cars  && <h3>Price: {props.price}, Available Cars: {props.cars}</h3>}
            {!props.cars && <h3>No Cars Available</h3>}
        </>
    )
}

export default PriceResult;