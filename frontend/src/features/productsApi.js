import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
    }),
    getProductById: builder.query({
      query: (ProductID) => `products/${ProductID}`,
    }),
    getCategory: builder.query({
      query: () => "category",
    }),
    getProductsByCategory: builder.query({
      query: (categoryName) => `category/${categoryName}`,
    }),
    getSearch: builder.query({
      query: (searchItem) => `search/${encodeURIComponent(searchItem)}`,
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "products",
        method: "POST",
        body: productData,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetCategoryQuery,
  useGetSearchQuery,
  useCreateProductMutation, // Add the created mutation hook to the export list
} = productsApi;
