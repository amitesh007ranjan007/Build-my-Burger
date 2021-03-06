import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxilliary from '../../../hoc/Auxilliary';
const sideDrawer = (props) => {

    let classLists = [classes.SideDrawer, classes.Close]
    if (props.open) {
        classLists = [classes.SideDrawer, classes.Open]
    }
    return (
        <Auxilliary>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={classLists.join(' ')}>
        <div className={classes.Logo}>
            <Logo />
        </div>
            <nav>
                <NavigationItems />
            </nav>

        </div>
        </Auxilliary>

    );
}

export default sideDrawer;