import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidedrawer.module.css';
import Auxa from '../../../hoc/Auxa/Auxa';
import Backdrop from '../../UI/Backdrop/Backdrop'

function Sidedrawer(props) {
    let attachedClasses = [classes.Sidedrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.Sidedrawer, classes.Open]
    }
  return (

    <Auxa>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(" ")}>
            <div className={classes.Logo}>
                <Logo />
            </div>
        <nav>
            <NavigationItems />
        </nav>
        </div>
    </Auxa>
  )
}

export default Sidedrawer