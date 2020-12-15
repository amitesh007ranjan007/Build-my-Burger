import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        loading: false

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
           loading: true 
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Amitesh',
                address: {
                    street: '117 manningham street',
                    zipCode: '3052',
                },
                phone: '99090'
            },
            deliveryMethod: 'super fast'
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
        let form = (
            <form>
                    <Input inputtype='input'  type='text' name="name" placeholder="Your Name" />
                    <Input inputtype='input' type='text' name="email" placeholder="Your Email" />
                    <Input inputtype='input' type='text' name="phone" placeholder="Your Phone" />
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