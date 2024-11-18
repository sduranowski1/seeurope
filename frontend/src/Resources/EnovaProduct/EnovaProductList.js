import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import Checkbox from "@mui/material/Checkbox";
import { Button, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import ExportButton from "../../Components/AdminExportButton/ExportButton";
import CustomTableHead from "../../Components/AdminTableHead/CustomTableHead";
import CustomCheckbox from "../../Components/AdminCheckbox/CustomCheckbox";
import { fetchToken } from "../../utils/fetchToken";
import { Link, useNavigate } from "react-router-dom";

const EnovaProductList = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [variants, setVariants] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10); // Number of items per page
  const navigate = useNavigate();

  // Debounce timeout variable
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Memoize the totalPages calculation to prevent unnecessary re-calculation
  const totalPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit]);

  const fetchAdditionalData = async () => {
    try {
      const [brandsResponse, variantsResponse] = await Promise.all([
        fetch('https://127.0.0.1:8000/api/brands'),
        fetch('https://127.0.0.1:8000/api/variants'),
      ]);

      if (!brandsResponse.ok || !variantsResponse.ok) {
        throw new Error('Failed to fetch additional data');
      }

      const brandsData = await brandsResponse.json();
      const variantsData = await variantsResponse.json();

      setBrands(brandsData);
      setVariants(variantsData);
    } catch (error) {
      console.error('Error fetching brands or variants:', error);
      setError('Failed to load brands or variants');
    }
  };

  // Function to fetch product data from both API endpoints
  const fetchProductData = useCallback(async () => {
    setLoading(true); // Set loading true at the start of the request
    try {
      const token = await fetchToken();
      setToken(token);

      const response = await fetch('https://127.0.0.1:8000/api/PanelWWW_API/DajTowary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          strona: currentPage,
          limit: limit,
          pokazCeny: true,
          poleSortowane: "ID",
          czyRosnaco: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error in product request: ${response.statusText}`);
      }

      const data = await response.json();

      // Map product data with brand and variant names
      const productsData = data.elementy.map((product) => {
        const dealerDetalPrice = product.listaCen.find((price) => price.nazwa === 'Dealer Detal');
        const netto = dealerDetalPrice ? dealerDetalPrice.netto : null;

        const brandName = brands.find((brand) => brand.id === product.productInfo?.braid)?.name || 'N/A';
        const variantName = variants.find((variant) => variant.id === product.productInfo?.varid)?.variantname || 'N/A';

        return { ...product, netto, brandName, variantName };
      });

      setProducts(productsData);
      setTotalItems(data.liczbaWszystkich);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  }, [currentPage, limit, brands, variants]);

  useEffect(() => {
    fetchAdditionalData();
  }, []); // Only fetch brands and variants once on mount

  useEffect(() => {
    if (brands.length > 0 && variants.length > 0) {
      fetchProductData();
    }
  }, [brands, variants, currentPage, limit]); // Fetch product data after brands and variants are loaded

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages && !loading) {
      setCurrentPage(page);
    }
  }, [totalPages, loading]);

  const handleRowClick = useCallback((productId) => {
    navigate(`/admin/enova-products/${productId}`);
  }, [navigate]);

  return (
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <ExportButton />
        </Box>

        <TableContainer component={Paper} sx={{ height: 583, position: 'relative' }}>
          {loading && (
              <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bgcolor="rgba(255, 255, 255, 0.7)"
              >
                <CircularProgress />
              </Box>
          )}
          {!loading && !error && (
              <Table>
                <CustomTableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <CustomCheckbox inputProps={{ 'aria-label': 'select all' }} />
                    </TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Price (Netto)</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Variant</TableCell>
                    <TableCell>Category</TableCell>
                  </TableRow>
                </CustomTableHead>
                <TableBody>
                  {products.map((product, index) => (
                      <TableRow
                          key={index}
                          onClick={() => handleRowClick(product.id)}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: '#f0f0f0',
                            },
                          }}>
                        <TableCell padding="checkbox">
                          <CustomCheckbox />
                        </TableCell>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.nazwa}</TableCell>
                        <TableCell align="right">{product.netto}</TableCell>
                        <TableCell>
                          {product.brandName !== 'N/A' ? (
                              <Link to={`/admin/brands/${product.productInfo?.braid}`}>
                                {product.brandName}
                              </Link>
                          ) : (
                              'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          {product.variantName !== 'N/A' ? (
                              <Link to={`/admin/brands/${product.productInfo?.varid}`}>
                                {product.variantName}
                              </Link>
                          ) : (
                              'N/A'
                          )}
                        </TableCell>
                        <TableCell>{product.productInfo ? product.productInfo.catid : 'TT'}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
          )}
          {error && <Box sx={{ color: 'red' }}>{error}</Box>}
        </TableContainer>

        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || loading}>
            Previous
          </Button>
          <Box display="flex" alignItems="center" marginX={2}>
            <span>Page {currentPage} of {totalPages}</span>
          </Box>
          <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || loading}>
            Next
          </Button>
        </Box>
      </div>
  );
};

export default EnovaProductList;
