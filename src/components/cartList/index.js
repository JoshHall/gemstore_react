import React, { Component } from 'react';
import './index.css';
import CartItem from '../cartItem';

class CartList extends Component {
  render() {
    return (
      <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody id="items">
                {this.props.cart &&
                  this.props.cart.map((item, key) =>
                    <CartItem item={item} key={key} removeItem={this.props.removeItem}/>
                  )
                }

              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="2">Total:</th>
                  <th colSpan="2" id="cart_total">${this.props.total}</th>
                </tr>
              </tfoot>
            </table>
      </div>
    );
  }
}

export default CartList;
