import React from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import classes from './Layout.css';

const layout = (props) => (
    <Auxilliary>
        <div>Navbar, DropBox</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxilliary>

);

export default layout;