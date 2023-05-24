import React from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useGetSearchQuery } from "../../features/productsApi";
import { addToCart } from "../../features/cartSlice";

const Search = () => {
  const { searchItem } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, error, isLoading } = useGetSearchQuery(searchItem);

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
      <h2>Search Result</h2>
      <div className="products">
        {data?.map((searchItem) => (
          <div key={searchItem.ProductID} className="product">
            <h3>{searchItem.Name}</h3>
            <a href={`/product/${searchItem.ProductID}`}>
              <img src={searchItem.Image} alt={searchItem.Name} />
            </a>
            <div className="details">
              <span>{searchItem.Description}</span>
              <span className="price">{searchItem.Price}VND</span>
            </div>
            <button onClick={() => handleAddToCart(searchItem)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
