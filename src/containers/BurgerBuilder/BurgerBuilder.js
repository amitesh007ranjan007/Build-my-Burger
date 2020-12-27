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
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onIngredientFetched()
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
             return true
         } else {
            return false

         }
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

        this.props.history.push('/checkout');
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
        let burger = this.props.error ? <p>Unable to fetch data</p> :<Spinner />
        let orderSummary = null
        if (this.props.ings) {
            burger = 
            <Auxilliary>
                <Burger ingredients={this.props.ings} />
                <BuildControls ingredientAdd={this.props.onIngredientAdded} 
                    ingredientRemove={this.props.onIngredientRemoved}
                    price={this.props.totPrice} disabledRemove={disabledInfoRemove}
                    disabledAdd={disabledInfoAdd}
                    purchasable ={this.updatePurchasable(this.props.ings)} 
                    ordered={this.purchaseHandler}/>
            </Auxilliary>

            orderSummary = <OrderSummary 
            ingredients={this.props.ings} 
            continuePurchase={this.continuePurchaseHandler} 
            cancelPurchase={this.cancelPurchaseHandler} 
            price={this.props.totPrice}/>
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
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchTOProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onIngredientFetched: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchTOProps)(withErrorHandler(BurgerBuilder, axios));