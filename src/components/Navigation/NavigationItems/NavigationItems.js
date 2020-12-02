import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {/* For boolean props can just be passed like that as below */}
        <NavigationItem link='/' active>Burger Builder</NavigationItem> 
        <NavigationItem link='/'>Checkout</NavigationItem>
    </ul>
);

export default navigationItems;