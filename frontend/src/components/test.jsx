import React from 'react';
import { useQuery } from 'react-query';

const Test = () => {
  const { data: products, error, isLoading } = useQuery('products', async () => {
    const response = await fetch('http://localhost:5000/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products.');
    }
    return response.json();
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.desc}</p>
          <p>Price: {product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Test;
