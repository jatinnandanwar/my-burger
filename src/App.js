import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import Checkout from './Container/Checkout/Checkout';
import { Route, Routes } from 'react-router-dom';
import Navigate from './Container/BurgerBuilder/Navigate';
import Orders from './Container/Orders/Orders';


class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          
          <Routes>
            <Route path='/' exact element={<Navigate />}/>
            <Route path='/checkout' exact element={<Checkout />}/>
            <Route path='/orders' exact element={<Orders />} />
          </Routes>
        </Layout>
      </div>
    )
  }
}

export default App;