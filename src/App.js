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
    this.calcTotal();
  }

  removeItem= id => {
    // set local varible to the current cart
    let items = this.state.cart;

    // loop through current cart and splice when we find the correct id
    for (let index in items) {
      if (items[index].id === id) {
        items.splice(index,1);
        break;
      }
    }

    this.setState({
      cart: items
    });

    this.calcTotal();
  }

  calcTotal = () => {
    let total= 0;

    for (let index in this.state.cart) {
      total += this.state.cart[index].price;
    }

    total = total.toFixed(2);

    this.setState({
      total: total
    });
  }


  render() {
    return (
      <div className="App">
      <Navbar />
        <Switch>
          <Route exact path='/' render={() => <Home products={this.state.products} addItem={this.addItem}/>} />
          <Route exact path='/checkout' render={() => <Checkout cart={this.state.cart} removeItem={this.removeItem} total={this.state.total} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
