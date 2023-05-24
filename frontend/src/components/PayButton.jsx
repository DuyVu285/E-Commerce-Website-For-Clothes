import axios from "axios";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    console.log(cartItems);
    axios
      .post(`http://localhost:5000/create-checkout-session`, {
        cartItems,
        UserID: user.UserID,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <>
      <button onClick={() => handleCheckout()}>Check Out</button>
    </>
  );
};

export default PayButton;
