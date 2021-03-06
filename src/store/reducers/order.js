import * as actionTypes from '../actions/actionTypes';

const initialState = {
    order: [],
    loading: false,
    purchased: false,
    fetchedOrders: false,
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false

            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                order: state.order.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_INIT:
            return {
                ...state,
                order: action.order,
                fetchedOrders: true,
                error: false

            }
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                fetchedOrders: false,
                error: true
            }
        default: return state
    }
}
export default reducer;