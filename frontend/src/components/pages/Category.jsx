import { useGetCategoryQuery } from "../../features/productsApi";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, error, isLoading } = useGetCategoryQuery();

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured</p>
      ) : (
        <>
          <h2>Category</h2>
          <div className="products">
            {data?.map((category) => (
              <div key={category.CategoryID} className="product">
                <h3>{category.Name}</h3>
                <Link to={`/category/${category.Name}`}>
                  <img src={category.Image} alt={category.Name} />
                </Link>
                <div className="details">
                  <span>{category.Description}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
