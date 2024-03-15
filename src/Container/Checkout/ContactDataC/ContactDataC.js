import React, { Component } from 'react'
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactDataC.module.css';
import ConfirmData from '../ConfirmData/ConfirmData';
import Input from '../../../Components/UI/Input/Input';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';

export class ContactDataC extends Component {

    state = {
        orderForm: {
            Name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            Email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your Email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            Address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Address',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            MobileNo: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Mobile no.',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 12,
                },
                valid: false,
                touched: false
            },
        },
        loading: false,
        confirm: false,
        formIsValid: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        const formData = {};
        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData: formData,
        }
        this.setState({confirm: true, loading: true});

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                // alert("Your Burger Order Successfully Submitted.");
            })
            .catch(error => console.log(error));
        this.setState({loading: false});
    }

    checkValidity(value, rules){
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (e, id) =>{
        const updatedOrderForm = { ...this.state.orderForm};
        const updatedFormElement = { ...updatedOrderForm[id]};

        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[id] = updatedFormElement;

        let formIsValid = true;
        for(let inputId in updatedOrderForm){
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

  render() {

    let formElementArray = [];
    for(let key in this.state.orderForm){
        formElementArray.push({
            id: key,
            config: this.state.orderForm[key],    //name
        })
    }

    let form = (
        <form onSubmit={this.orderHandler}>
            {formElementArray.map(formElement => {
                return <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            name={formElement.id}
                            changed={(e) => this.inputChangedHandler(e, formElement.id)}/>
            })}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
    );

    if (this.state.loading) {
        <Spinner />
    }

    return (
      <div>
        <div className={classes.ContactDataC}>
          <h3>Enter Your Contact Data</h3>
          {form}
        </div>
        {this.state.confirm && <ConfirmData close={this.props.close}/>}
      </div>
    )
  }
}

export default ContactDataC
