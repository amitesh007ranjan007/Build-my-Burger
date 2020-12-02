import React, {Component} from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    SideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }


    render () {
        return (
            <Auxilliary>
                <Toolbar drawToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxilliary>
        );
    }
}

export default Layout;