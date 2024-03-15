import React from 'react'
import classes from './Order.module.css';

function Order(props) {

    const ingredient = [];

    for(let ingredientName in props.ingredients){
        ingredient.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const style = {
        boxShadow: '0 1px 3px grey',
        margin: '0 3px', 
        padding: '0 3px',
        textTransform: 'capitalize'
    }

    const ingredientOutput = ingredient.map(ig => {
        return <span key={ig.name} style={style}> {ig.name}-{ig.amount} </span>
    })

    const formData = [];

    for(let formdata in props.orderData){
        formData.push({
            name: formdata,
            value: props.orderData[formdata]
        })
    }

    const orderDataOutput = formData.map(id => {
        return <p key={id.name}> {id.name} : {id.value}</p>
    })

  return (
    <div className={classes.Order}>
        <p>Ingredients : {ingredientOutput}</p>
        {orderDataOutput}

        {/* ContactData */}
        {/* <p>Name : {props.name}</p>
        <p>Email : {props.email}</p>
        <p>TotalPrice : {props.totalPrice}</p>
        <p>Address : {props.address}</p>
        <p>Mobile No. : {props.mobile}</p> */}
    </div>
  )
}

export default Order