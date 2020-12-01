import React, {Component} from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 1,
    cheese: 0.5,
    meat: 1.5
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 3, //Price of a burger with no ingredients
        purchasable: false
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
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
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
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return
        }
        this.disabledInfo=false;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = oldCount - 1;
        const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newTotalPrice
        })
        this.updatePurchasable(updatedIngredients);
    }

    render() {
        const disabledInfoRemove = {
            ...this.state.ingredients
        }

        const disabledInfoAdd = {
            ...this.state.ingredients
        }

        for (let key in disabledInfoRemove) {
            disabledInfoRemove[key] = (this.state.ingredients[key] <= 0)
        }

        for (let key in disabledInfoAdd) {
            disabledInfoAdd[key] = (this.state.ingredients[key] >= 3)
        }
        return (
        <Auxilliary>
            <Modal>
                <OrderSummary ingredients={this.state.ingredients} />
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls ingredientAdd={this.addIngredientsHandler} ingredientRemove={this.removeIngredientsHandler}
             price={this.state.totalPrice} disabledRemove={disabledInfoRemove} disabledAdd={disabledInfoAdd}
             purchasable ={this.state.purchasable} />
        </Auxilliary>
        );
    }
}

export default BurgerBuilder;