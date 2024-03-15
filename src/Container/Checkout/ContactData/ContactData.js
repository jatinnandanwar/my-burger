import React, { Component } from 'react'
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import ConfirmData from '../ConfirmData/ConfirmData';

export class ContactData extends Component {

    state = {
        ingredients: this.props.ingredients,
        name: "",
        email: '',
        totalPrice: this.props.totalPrice,
        address: "",
        mobileNo: '',
        confirm: false,
    }

    orderHandler = (e) => {
        e.preventDefault();

        // const formData = [
        //   {ingredients: this.state.ingredients},
        //   {name: this.state.name},
        //   {email: this.state.email},
        //   {totalPrice: this.state.totalPrice},
        //   {address: this.state.address},
        //   {mobileNo: this.state.mobileNo}];
          
        // console.log(formData);
        this.setState({confirm: true});
        axios.post('/orders.json', this.state)
            .then(response => {
                console.log(response)
                // alert("Your Burger Order Successfully Submitted.");
            })
            .catch(error => console.log(error));

        // this.closeHandler();
        
    }

  render() {
    return (
      <div>
        <div className={classes.ContactData}>
          <h3>Enter Your Contact Data</h3>
          <form className={classes.form}>
              <input className={classes.Input} value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} type="text" name='name' placeholder='Your Name' required/>
              <input className={classes.Input} value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} type="email" name='email' placeholder='Your Email'/>
              <input className={classes.Input} value={this.state.address} onChange={(e) => this.setState({address: e.target.value})} type="text" name='address' placeholder='Your Address' required/>
              <input className={classes.Input} value={this.state.mobileNo} onChange={(e) => this.setState({mobileNo: e.target.value})} type="text" name='mobile' placeholder='Your Mobile No'/>
              <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
          </form>
        </div>

        {this.state.confirm && <ConfirmData close={this.props.close}/>}
      </div>
    )
  }
}

export default ContactData
