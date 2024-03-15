import React, { Component } from 'react'
// import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

export class Checkout extends Component {

    state ={
        ingredients: null
    }

    checkoutCancelledHandler = () => {
        // this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        // this.props.history.replace('/checkout/contact-data');
    }

  render() {
    return (
      <div>
        <ContactData />
          {/* {this.props.ingredients && <CheckoutSummary 
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
          } */}
      </div>
    )
  }
}

export default Checkout