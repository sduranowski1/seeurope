import React, { useState, useEffect } from 'react';
import {Datagrid, List, NumberField, TextField} from "react-admin";
import { fetchUtils } from 'react-admin';

const EnovaProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch product data from both API endpoints
  const fetchProductData = async () => {
    try {
      // Fetch the token first
      const response1 = await fetch('https://127.0.0.1:8000/api/fetch-enova-token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response1.ok) {
        throw new Error(`Error in first request: ${response1.statusText}`);
      }

      const data1 = await response1.json();
      console.log('First response:', data1);

      // Store the token (or other required data from the first response)
      // setToken(data1.token); // Adjust as needed based on response structure

      // Fetch the second set of data (products)
      const response2 = await fetch('https://127.0.0.1:8000/api/PanelWWW_API/DajTowary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          strona: 1,
          limit: 5,
          pokazCeny: true,
        }),
      });

      if (!response2.ok) {
        throw new Error(`Error in second request: ${response2.statusText}`);
      }

      const data2 = await response2.json();
      console.log('Second response:', data2);

      // Extract the relevant product data
      const productsData = data2.elementy;

      // Now, extract the 'netto' where 'nazwa' is 'Dealer Detal'
      const updatedProducts = productsData.map((product) => {
        const dealerDetalPrice = product.listaCen.find(
            (price) => price.nazwa === 'Dealer Detal'
        );
        const netto = dealerDetalPrice ? dealerDetalPrice.netto : null;
        return { ...product, netto }; // Add netto value to product object
      });

      setProducts(updatedProducts);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchProductData when the component mounts
  useEffect(() => {
    fetchProductData();
  }, []);

  // React Admin UI components to display the list
  const ProductList = () => (
      <List>
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>Error: {error}</p>
        ) : (
            <Datagrid>
              <TextField source="nazwa" label="Product Name" />
              <TextField source="kod" label="Product Code" />
              <TextField source="EAN" label="EAN" />
              <NumberField source="netto" label="Net Price" />
            </Datagrid>
        )}
      </List>
  );

  return (
      <div>
        <h1>Enova Product List</h1>
        {loading ? <p>Loading...</p> : <ProductList />}
      </div>
  );
};

export default EnovaProductList;
