import React, { Component } from 'react';
import './index.css';

class CartItem extends Component {
  render() {
    return (
      <div className="CartItem">
        <div className="row">
          { this.props.products &&
            this.props.products.map(product =>
              <ProductItem info={product} key={product.id} addItem={this.props.addItem}/>
            )
          }
        </div>
      </div>
    );
  }
}

export default CartItem;
