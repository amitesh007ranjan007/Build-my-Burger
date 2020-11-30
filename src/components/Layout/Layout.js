import React from 'react';
import Auxilliary from '../../hoc/Auxilliary';

const layout = (props) => (
    <Auxilliary>
        <div>Navbar, DropBox</div>
        <main>
            {props.children}
        </main>
    </Auxilliary>

);

export default layout;