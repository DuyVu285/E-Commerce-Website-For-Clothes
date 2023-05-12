import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
  getTotals
} from "../features/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="Quantity">Quantity</h3>
            <h3 className="Total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((cartItems) => (
              <div className="cart-item" key={cartItems.id}>
                <div className="cart-product">
                  <img src={cartItems.image} alt={cartItems.name} />
                  <div>
                    <h3>{cartItems.name}</h3>
                    <p>{cartItems.desc}</p>
                    <button onClick={() => handleRemoveFromCart(cartItems)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">{cartItems.price}VND</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecreaseCart(cartItems)}>
                    -
                  </button>
                  <div className="count">{cartItems.cartQuantity}</div>
                  <button onClick={() => handleIncreaseCart(cartItems)}>
                    +
                  </button>
                </div>
                <div className="cart-product-total-price">
                  {cartItems.price * cartItems.cartQuantity}VND
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount"> {cart.cartTotalAmount} VND</span>
              </div>
              <p>Tax and shipping calculated at checkout</p>
              <button>Check out</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
