import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  updateCartQuantity,
  removeItemFromCart,
} from "../../actions/cartAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  //function to remove items from the cart
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };
  //function to increase the quantity of an item
  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };

  //function for decreasing the quantity of an item

  const decreaseQty = (id, quantity) => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      dispatch(updateCartQuantity(id, newQty));
    }
  };

  //function to navigate to the delivery page
  const checkoutHandler = () => {
    navigate("/delivery");
  };

  return (
    <>
      {/* Conditional rendering based on our cart items */}
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Your cart is empty</h2>
      ) : (
        <>
          {/* Display the number of items in the cart */}
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          {/* cart items */}
          <div className="row d-flex justify-content-between cartt">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <>
                  <hr />
                  <div className="cart-item" key={item.fooditem}>
                    <div className="row">
                      {/* Display Item image */}
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt="items"
                          height="90"
                          width="115"
                        ></img>
                      </div>

                      {/* Display Item Name */}
                      <div className="col-5 col-lg-3"> {item.name}</div>

                      {/* Display item price  */}
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">
                          <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                          {item.price}
                        </p>
                      </div>

                      {/* Quantity control */}
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          {/* decrease Qty button */}
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item.fooditem, item.quantity)
                            }
                          >
                            -
                          </span>
                          {/* Display current quantity */}
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />
                          {/* increase quantity button */}
                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item.fooditem,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>
                      {/* Remove item button */}
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => removeCartItemHandler(item.fooditem)}
                        ></i>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            {/* Order Summary */}
            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4 >Order Summary</h4>
                <hr />
                {/* Display Subtotal */}
                <p>
                  Subtotal:
                  <span className="order-summary-values">
                    {cartItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}
                    (items)
                  </span>
                </p>
                {/* Display Total */}
                <p>
                  Total:
                  <span className="order-summary-values">
                    <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>
                <hr />
                {/* Checkout Button */}
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
