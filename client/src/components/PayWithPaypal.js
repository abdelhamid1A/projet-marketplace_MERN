import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";


const CLIENT = {
  sandbox:
    "Aev141P-qrlQXV_G9f7drnGAF-3C4ga24mQ2sSFDqpOOTTzieWdbUUucnvoGzv_9oQ3ARrQMV_BDjYaF",
  production: "your client id",
};

const CLIENT_ID =
  process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const {
      isScriptLoaded,
      isScriptLoadSucceed,// eslint-disable-next-line
      addOrder,// eslint-disable-next-line
      totalPrice
    } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

 


  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "",
          amount: {
            currency_code: "USD",
            value: this.props.totalPrice,
          },
        },
      ],
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then((details) => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID,
      };
      this.props.addOrder();
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons,// eslint-disable-next-line
             loading, paid } = this.state;

    return (
      <div className="mainn mt-5">
        {showButtons && (
          <div>
            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
            <div></div>
          </div>
        )}

        {paid && <h1>Success</h1>}
      </div>
    );
  }
}

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`
)(PaypalButton);