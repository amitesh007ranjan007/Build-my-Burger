import React from 'react';
import classes from './Logo.css';
import MyBurgerLogo from '../../assets/Logo/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={MyBurgerLogo} alt="My Burger" />
    </div>
);

export default logo;