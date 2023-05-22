import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useGetAllProductsQuery } from "../features/productsApi";
import { addToCart } from "../features/cartSlice";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history.push("/cart");
  };

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
            <div className="products">
              {data?.map((product) => (
                <div key={product.ProductID} className="product">
                  <h3>{product.Name}</h3>
                  <a href={`/product/${product.ProductID}`}>
                    <img src={product.Image} alt={product.Name} />
                  </a>
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

export default Home;
