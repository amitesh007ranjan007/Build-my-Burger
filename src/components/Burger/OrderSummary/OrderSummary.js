import React from 'react';
import Auxilliary from '../../../hoc/Auxilliary';
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
     .map(igKey => {
         return (
             <li key={igKey}><span style={{textTransform: 'capitalize '}}>{igKey}: </span>{props.ingredients[igKey]}</li>
         )
     })
    return (
        <Auxilliary>
            <h3>Your Order</h3>
            <p>Your burger is ready with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Please continue to checkout..</p>
        </Auxilliary>
    );
}

export default orderSummary;