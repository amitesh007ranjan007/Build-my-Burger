import React, {Component} from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 1,
    cheese: 0.5,
    meat: 1.5
}
class BurgerBuilder extends Component {
    state = {
        totalPrice: 3, //Price of a burger with no ingredients
        purchasable: false,
        purchasing: false,
        loading: false,
        ingredientsFetched: false,
        error: false
    }

    componentDidMount () {
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data,
                ingredientsFetched: true})
        })
        .catch(error => this.setState({error: true}));
    }

    updatePurchasable = (ingreds) => {
        const ingredients = Object.keys(ingreds)
         .map((igKey) => {
            return ingreds[igKey]
         })
         .reduce((arr, el) => {
            return arr + el
         }, 0)

         if (ingredients > 0) {
             this.setState({
                 purchasable: true
             })
         } else {
            this.setState({
                purchasable: false
            })

         }
    }

    addIngredientsHandler = (type) => {
        const updatedCount = this.props.ings[type] + 1;
        const updatedIngredients = {
            ...this.props.ings
        }
        updatedIngredients[type] = updatedCount;
        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        })
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.props.ings[type];
        if (oldCount <= 0) {
            return
        }
        this.disabledInfo=false;
        const updatedIngredients = {
            ...this.props.ings
        }
        updatedIngredients[type] = oldCount - 1;
        const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        })
        this.updatePurchasable(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    continuePurchaseHandler = () => {
        
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.props.ings[i]));
        }
        queryParams.push('price=' +this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    render() {
        const disabledInfoRemove = {
            ...this.props.ings
        }

        const disabledInfoAdd = {
            ...this.props.ings
        }

        for (let key in disabledInfoRemove) {
            disabledInfoRemove[key] = (this.props.ings[key] <= 0)
        }

        for (let key in disabledInfoAdd) {
            disabledInfoAdd[key] = (this.props.ings[key] >= 3)
        }
        let burger = this.state.error ? <p>Unable to fetch data</p> :<Spinner />
        let orderSummary = null
        if (this.state.ingredientsFetched) {
            burger = 
            <Auxilliary>
                <Burger ingredients={this.props.ings} />
                <BuildControls ingredientAdd={this.props.onIngredientAdded} 
                    ingredientRemove={this.props.onIngredientRemoved}
                    price={this.state.totalPrice} disabledRemove={disabledInfoRemove}
                    disabledAdd={disabledInfoAdd}
                    purchasable ={this.state.purchasable} 
                    ordered={this.purchaseHandler}/>
            </Auxilliary>

            orderSummary = <OrderSummary 
            ingredients={this.props.ings} 
            continuePurchase={this.continuePurchaseHandler} 
            cancelPurchase={this.cancelPurchaseHandler} 
            price={this.state.totalPrice}/>
        }
        


        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
        <Auxilliary>
            <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                {orderSummary}
            </Modal>
            {burger}
            
        </Auxilliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

const mapDispatchTOProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchTOProps)(withErrorHandler(BurgerBuilder, axios));