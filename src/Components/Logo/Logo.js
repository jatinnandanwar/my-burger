import React from 'react'
import BurgerLogo from '../../Assets/images/burger-logo.png';
import classes from './Logo.module.css';

function Logo(props) {
  return (
    <div className={classes.Logo}>
      <img src={BurgerLogo} alt="My Burger" />
    </div>
  )
}

export default Logo
