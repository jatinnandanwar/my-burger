import React, {useState} from 'react'
// import Checkout from '../../../Container/Checkout/Checkout';
// import ContactData from '../../../Container/Checkout/ContactData/ContactData';
import ContactDataC from '../../../Container/Checkout/ContactDataC/ContactDataC';
import Auxa from '../../../hoc/Auxa/Auxa'
import Button from '../../UI/Button/Button';
// import { useNavigate } from 'react-router'

function OrderSummary(props) {

    const [hide, setHide] = useState(false)

    // const navigate = useNavigate();

    const continuedHandler = () => {
        // navigate('/checkout');

        setHide(true)
    }

    const ingredientSummary = Object.keys(props.ingredients).map(igKey =>{
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
            </li>
        );
    });
    return (
        <Auxa>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.purchaseCanceled} btnType="Danger">CANCEL</Button>
            <Button clicked={continuedHandler} btnType="Success">CONTINUE</Button>

            {/* {hide && <ContactData ingredients={props.ingredients} totalPrice={props.price} close={props.purchaseCanceled}/>} */}
            {hide && <ContactDataC ingredients={props.ingredients} totalPrice={props.price} close={props.purchaseCanceled}/>}
        </Auxa>
    )
}

export default OrderSummary
