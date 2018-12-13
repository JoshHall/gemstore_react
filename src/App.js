import React, { Component } from 'react';
import './App.css';
import Home from './views/home';
import Checkout from './views/checkout';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import PRODUCTS from './static/data/products.js';

class App extends Component {
  constructor(){
    super();

    this.state = {
      products: [],
      cart: [],
      total: 0
    }
  }

  componentWillMount() {
    this.setState({
      products: PRODUCTS
    });
  }

  // add product to cart using an id, function written here because state is stored within this component
  addItem = id => {
    let item = {};
    let cart = this.state.cart;

    // for (let index in this.state.products) {
    //   if (id === this.state.products[index].id) {
    //     // add full product info to cart variable
    //     this.state.cart.push(this.state.products[index]);
    //     break;
    //   }
    // }
    for (let index in this.state.products) {
      if (id === this.state.products[index].id) {
        // add full product info to cart variable
        item = this.state.products[index];
        break;
      }
    }
    cart.push(item);
    this.setState({
      cart: cart
    });
    console.log(this.state.cart);
  }


  render() {
    return (
      <div className="App">
      <Navbar />
        <Switch>
          <Route exact path='/' render={() => <Home products={this.state.products} addItem={this.addItem}/>} />
          <Route exact path='/checkout' render={() => <Checkout />} />
        </Switch>
      </div>
    );
  }
}

export default App;
