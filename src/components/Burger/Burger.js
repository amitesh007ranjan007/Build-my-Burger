import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { connect } from 'react-redux';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ings)
    .map(igKey =>  [...Array(props.ings[igKey])].map((_, index) => {
        return <BurgerIngredient key={igKey+index} type={igKey} />
    })
    ).reduce((arr, el) => arr.concat(el), []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding the ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />

        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(burger);