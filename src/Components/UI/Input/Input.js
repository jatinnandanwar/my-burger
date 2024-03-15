import React from 'react';
import classes from './Input.module.css';

function Input(props) {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.validationError}>Please enter a valid {props.name}!</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        default:
            inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
    }

  return (
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        {validationError}
    </div>
  )
}

export default Input
