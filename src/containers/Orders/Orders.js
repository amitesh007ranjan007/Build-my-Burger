import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from './Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchedOrders();
    }

    render() {
        const summary = 
        <div>
        {this.props.orders.map(order => (
            <Order key={order.id} 
            ingredients={order.ingredients}
            price={order.price}/>
        ))}
    </div>
        const orderData = this.props.fetchedOrders ? summary : <Spinner />
        return orderData
    }

}

const mapStateToProps = state => {
    return {
        orders: state.order.order,
        fetchedOrders: state.order.fetchedOrders


    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchedOrders: () => dispatch(actions.fetchOrdersInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));