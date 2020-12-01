import React from 'react';
import Auxilliary from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';
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
    <p><strong>Total price : {props.price}</strong></p>
            <p>Please continue to checkout..</p>
            <Button buttonType="Danger" clicked={props.cancelPurchase}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.continuePurchase}>CONTINUE</Button>
        </Auxilliary>
    );
}

export default orderSummary;