import React from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useGetProductByIdQuery } from "../../features/productsApi";
import { addToCart } from "../../features/cartSlice";

const Product = () => {
  const { ProductID } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(parseInt(ProductID));

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history.push("/cart");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>An error occurred</p>;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="productPage">
      <img src={product.Image} alt={product.Name} />
      <div className="details">
        <h2>Product Info</h2>
        <h2>{product.Name}</h2>
        <p>{product.Description}</p>
        <p className="price">{product.Price}VND</p>
        <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
      </div>
    </div>
  );
};

export default Product;
