import { useEffect, useState } from "react";
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const useGetAllProductsQuery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProducts = async () => {
      try {
        const response = await fetchBaseQuery({ baseUrl: "http://localhost:5000" })("/products", { signal });
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      // Cleanup: cancel the request if the component unmounts
      controller.abort();
    };
  }, []);

  return { data: products, error, isLoading: loading };
};

export default useGetAllProductsQuery;
