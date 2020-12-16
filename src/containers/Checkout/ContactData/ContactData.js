import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Email'
                    },
                    value: ''
                },     
                phone: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Phone'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                       options: [{value: 'fastest', displayVal: 'Fastest'},
                       {value: 'cheapest', displayVal: 'Cheapest'}]
                    },
                    value: ''
                }
        },
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
           loading: true 
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
        }
        axios.post('/orders.json', order)
        .then(response => {this.setState({
            loading: false
        })
        this.props.history.push('/');
    }
        )
        .catch(error => this.setState({
            loading: false
        }));
        

    }



    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form>
                {formElementsArray.map(element => (
                    <Input 
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value} />
                ))}
                <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
                    
            </form>

        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;