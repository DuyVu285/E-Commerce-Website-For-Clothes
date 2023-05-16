import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useGetProductsByCategoryQuery } from "../features/productsApi";
import { addToCart } from "../features/cartSlice";

const ProductListByCategory = () => {
  const { CategoryName } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, error, isLoading } =
    useGetProductsByCategoryQuery(CategoryName);

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

  if (!data) {
    return null;
  }

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured</p>
      ) : (
        <>
          <h2>{CategoryName}</h2>
          <div className="products">
            {data.map((product) => (
              <div key={product.ProductID} className="product">
                <h3>{product.Name}</h3>
                <Link to={`/product/${product.ProductID}`}>
                  <img src={product.Image} alt={product.Name} />
                </Link>
                <div className="details">
                  <span>{product.Description}</span>
                  <span className="price">{product.Price}VND</span>
                </div>
                <button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListByCategory;
