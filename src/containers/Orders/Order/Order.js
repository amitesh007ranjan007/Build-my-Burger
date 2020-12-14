import React from 'react';
import classes from './Order.css';
const order = (props) => {
    const ingredients = [];
    
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]})
    }

    console.log(ingredients);

    
    const ingredientOutput = ingredients.map(ig => {
    return <span 
                style={{textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                bordr: '1px solid #ccc',
                padding: '5px'
        }}  
                key={ig.name}
                >{ig.name} ({ig.amount}) </span>
    })
    
    console.log(ingredientOutput)

    return (
        <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
    <p>Price: <strong>AU {props.price}</strong></p>
    </div>
    );


}

export default order;