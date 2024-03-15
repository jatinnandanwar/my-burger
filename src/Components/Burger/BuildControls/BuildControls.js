import React from 'react'
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    { label: "Salad", type: "salad"},
    { label: "Bacon", type: "bacon"},
    { label: "Cheese", type: "cheese"},
    { label: "Meat", type: "meat"},
]

function BuildControls(props) {
  return (
    <div className={classes.BuildControls}>
      <p>Price- {props.price}</p>
      {controls.map(ctrl => {
        return <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={() =>props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemove(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/>
      })}
      <button 
        className={classes.OrderButton}
        onClick={props.ordered}
        disabled={!props.purchable}>ORDER NOW</button>
    </div>
  )
}

export default BuildControls
