import React, { Component } from 'react';
import './index.css';
import CartList from '../../components/cartList';

class Checkout extends Component {
  render() {
    return (
      <div className="Checkout">
        <CartList cart={this.props.cart} removeItem={this.props.removeItem} total={this.props.total}/>
      </div>
    );
  }
}

export default Checkout;
