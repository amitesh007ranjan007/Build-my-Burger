import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSumary}>
            <h1>We hope you have a great time having this burger!</h1>
            <div style={{width: '100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </ div>
            <div style={{textAlign: 'Center'}}>
            <Button 
                buttonType='Danger' 
                clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button 
                buttonType='Success' 
                clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    )

}

export default checkoutSummary;