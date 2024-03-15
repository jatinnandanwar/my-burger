import React, { Component } from 'react'
import Auxa from '../Auxa/Auxa'
import Sidedrawer from '../../Components/Navigation/Sidedrawer/Sidedrawer';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

class Layout extends Component {

  state = {
    showSideDrawer: false,
  }

  sideDrawerClosedHandler = () =>{
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler =() =>{
    this.setState((prevState) =>{
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render() {

  return (
    <Auxa>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <Sidedrawer 
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Auxa>
  )
  }
}

export default Layout