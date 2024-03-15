import React from 'react'
import { useNavigate } from 'react-router'
import BurgerBuilder from './BurgerBuilder';

function Navigate() {

    const navigate = useNavigate();

  return (
    <BurgerBuilder navigation={navigate}/>
  )
}

export default Navigate