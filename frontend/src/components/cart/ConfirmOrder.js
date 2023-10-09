import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
//import { Link } from "react-router-dom";
//import { useState, useEffect } from "react;";
//import Icon from "react-crud-icons";
//import axios from "axios";
//import "../css/react-crud-icons.css";
//import Modal from "react-modal";

const ConfirmOrder = () => {
  const { cartItems, deliveryInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Calculate order prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryPrice = itemsPrice > 199 ? 0 : 20;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const finalTotal = (itemsPrice + deliveryPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      deliveryPrice,
      taxPrice,
      //totalPrice,
      finalTotal,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    //history.push("/payment");
    navigate("/payment");
  };

  return (
    <>
      {/* <MetaData title={'Confirm Order'} /> */}

      <CheckoutSteps delivery confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm cartt">
          <h3 className="mt-3 mb-3 fw-bold-600">Delivery Info</h3>
          <p>
            <b>Name:</b> {user && user.name}
          </p>
          <p>
            <b>Phone:</b> {deliveryInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address: </b>
            {`${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.postalCode}, ${deliveryInfo.country}`}
          </p>

          <hr />
          <h3 className="mt-4 fw-bold">Your Cart Items:</h3>

          {cartItems.map((item) => (
            <Fragment key={item.id}>
              <hr />
              <div className="cart-item my-1" key={item.fooditem}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Item" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">{item.name}</div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x{" "}
                      <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                      {item.price} ={" "}
                      <b>
                        <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                        {(item.quantity * item.price).toFixed(2)}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-5 cartt">
          <div id="order_summary ">
            <div className="order-summary">
            <h4>Order Summary</h4>

            </div>
            <hr />
            <p>
              Subtotal:
              <span className="order-summary-values">
                <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                {itemsPrice}
              </span>
            </p>
            <p>
              Delivery Charges:
              <span className="order-summary-values">
                <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                {deliveryPrice}
              </span>
            </p>
            <p>
              Tax:
              <span className="order-summary-values">
                <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                {taxPrice}
              </span>
            </p>

            <hr />
            <p>
              Total:
              <span className="order-summary-values">
                <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
                {/* {totalPrice} */}
                {finalTotal}
              </span>
            </p>
            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={processToPayment}
            >
              Proceed to Payment
            </button>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
