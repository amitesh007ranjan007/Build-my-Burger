import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    }
        )
        .catch(error => dispatch(purchaseBurgerFail(error)));

    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

const ordersFetched = (order) => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT,
        order: order
    }
}

const orderFetchedFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error

    }
}

export const fetchOrdersInit = () => {
    return dispatch => {
        axios.get('https://react-burger-build-4455d-default-rtdb.firebaseio.com/orders.json')
        .then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            dispatch(ordersFetched(fetchedOrders))
        })
        .catch(error => {
            dispatch(orderFetchedFailed(error));
        });
    }
}