import React, { Component } from 'react'
import Order from './Order/Order'
import axios from 'axios'

export class Orders extends Component {

    state = {
        orders: [],
    }


    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BASE_API_URL}/orders.json`)
            .then(response => {

                const fetchedOrder = [];
                for (let key in response.data) {
                    fetchedOrder.push({
                        ...response.data[key],
                        id: key,
                    })
                }

                this.setState({ orders: fetchedOrder })
                // console.log(this.state.orders);
            })
            .catch(error => {
                this.setState({ error: true });
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    // console.log(order)
                    return (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            orderData={order.orderData}

                        //ContactData
                        // name={order.name}
                        // email={order.email}
                        // totalPrice={order.totalPrice}
                        // address={order.address}
                        // mobile={order.mobileNo}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Orders