import React, { Component } from 'react'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Burger/Burger';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Modal from '../../Components/UI/Modal/Modal';
import Auxa from '../../hoc/Auxa/Auxa';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 30,
    meat: 20,
    bacon: 20
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 50,
        purchable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BASE_API_URL}/ingredients.json`)
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true });
            })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchable: sum > 0 })
    }

    AddIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredient);
    }

    RemoveIngredientHander = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredient);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }



    // purchaseContinueHandler = () =>{
    //     this.props.navigation('/checkout');
    // this.setState({loading: true});
    // const order = {
    //     ingredient: this.state.ingredients,
    //     price: this.state.totalPrice,
    //     customer: {
    //         name: "Jatin",
    //         address: {
    //             street: "Godadara Near",
    //             pincode: '395060',
    //             city: 'surat'
    //         },
    //         email: 'jatin@gmail.com'
    //     },
    //     deliveryMethod: "Faster"
    // }

    // axios.post('/orders.json',order)
    //     .then(response => this.setState({loading: false, purchasing: false}))
    //     .catch(error => this.setState({loading: false, purchasing: false}));
    // }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? "Ingredients can't be loaded" : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Auxa>
                    <Burger ingredient={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.AddIngredientHandler}
                        ingredientRemove={this.RemoveIngredientHander}
                        disabled={disabledInfo}
                        purchable={this.state.purchable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />``
                </Auxa>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                close={this.state.purchasing}
                // purchaseContinued={this.purchaseContinueHandler}
                purchaseCanceled={this.purchaseCancelHandler} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Auxa>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {/* <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}/> */}
                    {orderSummary}
                </Modal>
                {/* <Burger ingredient={this.state.ingredients}/>
            <BuildControls 
                ingredientAdded={this.AddIngredientHandler}
                ingredientRemove={this.RemoveIngredientHander}
                disabled={disabledInfo}
                purchable={this.state.purchable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}/> */}
                {burger}
            </Auxa>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
