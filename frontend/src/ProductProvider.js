import React, { createContext, useState, useEffect, useContext } from 'react';
import dataProvider from './dataProvider'; // import your custom data provider

// Create a Context
const ProductContext = createContext();

// Create a Provider Component
export const ProductProvider = ({ children }) => {
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [loadingBrands, setLoadingBrands] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await dataProvider.getList('brands', {
                    pagination: { page: 1, perPage: 100 },
                    sort: { field: 'id', order: 'ASC' },
                    filter: {},
                });
                setBrands(data);
                setLoadingBrands(false);
            } catch (error) {
                console.error('Error fetching brands:', error);
                setLoadingBrands(false);
            }
        };

        const fetchProducts = async () => {
            try {
                const { data } = await dataProvider.getList('products', {
                    pagination: { page: 1, perPage: 100 },
                    sort: { field: 'id', order: 'ASC' },
                    filter: {},
                });
                setProducts(data);
                setLoadingProducts(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoadingProducts(false);
            }
        };

        fetchBrands();
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ brands, products, loadingBrands, loadingProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook to use the ProductContext
export const useProducts = () => {
    return useContext(ProductContext);
};
