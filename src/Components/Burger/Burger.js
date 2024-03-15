import React from 'react'
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

function Burger(props) {

    let transformedIngredient = Object.keys(props.ingredient).map(igKey =>{       //object -ingredient
        // console.log(igKey);                                                      // salad bacon
        return [...Array(props.ingredient[igKey])].map((_,i) => {                   //object into Array
            // console.log(props.ingredient[igKey]);                                // 1 2 1 2
            return <BurgerIngredient key={igKey + i} type={igKey}/>                 // key = salad0 salad1
        });
        
    })
    .reduce((arr, el) =>{                                     //reduce empty array size
        return arr.concat(el);
    }, []);;

    // console.log(transformedIngredient.length)

    

    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>Please Start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"/>
        {transformedIngredient}
        <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default Burger
