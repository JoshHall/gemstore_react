import React, { Component } from 'react';
import './App.css';
import Home from './views/home';
import Checkout from './views/checkout';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import PRODUCTS from './static/data/products.js';
import firebase from './firebase';

class App extends Component {
  constructor(){
    super();

    this.state = {
      products: [],
      cart: [],
      total: 0
    };

    // push products to firebase
    firebase.database().ref('products').set(PRODUCTS);

    // push total to firebase
    firebase.database().ref('total').set(0);
  }

  componentWillMount() {
    // grab information stored on firebase, set state with all variables
    const DB = firebase.database().ref();
    DB.on('value', snapshot => {
      let data = snapshot.val();

      // check to see if cart exists within data variable, then set state
      if (data.cart) {
        this.setState({
          products: data.products,
          cart: data.cart,
          total: data.total
        });
      } else {
        this.setState({
          products: data.products,
          total: data.total
        });
      }


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

    // push cart to firebase
    firebase.database().ref('cart').set(cart);

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

    // push cart to firebase
    firebase.database().ref('cart').set(items);

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

    // push new total to firebase
    firebase.database().ref('total').set(total);
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
