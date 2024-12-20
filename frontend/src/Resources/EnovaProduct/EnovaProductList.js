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
import {Button, CircularProgress, InputAdornment} from "@mui/material";
import Box from "@mui/material/Box";
import ExportButton from "../../Components/AdminExportButton/ExportButton";
import CustomTableHead from "../../Components/AdminTableHead/CustomTableHead";
import CustomCheckbox from "../../Components/AdminCheckbox/CustomCheckbox";
import { fetchToken } from "../../utils/fetchToken";
import { Link, useNavigate } from "react-router-dom";
import {TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


const EnovaProductList = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10); // Number of items per page
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce timeout variable
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Memoize the totalPages calculation to prevent unnecessary re-calculation
  const totalPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit]);

  const fetchAdditionalData = async () => {
    try {
      const [brandsResponse, variantsResponse, categoriesResponse, subcategoriesResponse, itemTypesResponse] = await Promise.all([
        fetch('https://se-europe-test.pl/api/brands'),
        fetch('https://se-europe-test.pl/api/variants'),
        fetch('https://se-europe-test.pl/api/categories'),
        fetch('https://se-europe-test.pl/api/subcategories'),
        fetch('https://se-europe-test.pl/api/item_types'),
      ]);

      if (!brandsResponse.ok || !variantsResponse.ok || !categoriesResponse.ok ) {
        throw new Error('Failed to fetch additional data');
      }

      const brandsData = await brandsResponse.json();
      const variantsData = await variantsResponse.json();
      const categoriesData = await categoriesResponse.json();
      const subcategoriesData = await subcategoriesResponse.json();
      const itemTypesData = await itemTypesResponse.json();

      setBrands(brandsData);
      setVariants(variantsData);
      setCategories(categoriesData);
      setSubcategories(subcategoriesData);
      setItemTypes(itemTypesData);
    } catch (error) {
      console.error('Error fetching brands, categories or variants:', error);
      setError('Failed to load brands, categories or variants');
    }
  };

  // Function to fetch product data from both API endpoints
  const fetchProductData = useCallback(async () => {
    setLoading(true); // Set loading true at the start of the request
    try {
      const token = await fetchToken();
      setToken(token);

      const response = await fetch('https://se-europe-test.pl/api/PanelWWW_API/DajTowary?nazwa=Koszt', {
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
          nazwa: searchQuery || "", // Use the dynamic search query
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

        const wzrostu = product.listaCechy.find((value) => value.nazwa === '% wzrostu');
        const procWzrostu = wzrostu ? wzrostu.wartosc : null;

        const replacement = product.listaCechy.find((value) => value.nazwa === 'Części zamienne');
        const replacementParts = replacement ? replacement.wartosc : null;

        const brandName = brands.find((brand) => brand.id === product.productInfo?.braid)?.name || 'N/A';
        const variantName = variants.find((variant) => variant.id === product.productInfo?.varid)?.variantname || 'N/A';
        const categoryName = categories.find((category) => category.id === product.productInfo?.catid)?.name || 'N/A';
        const subcategoryName = subcategories.find((subcategory) => subcategory.id === product.productInfo?.scatid)?.subCatName || 'N/A';
        const itemTypeName = itemTypes.find((itemType) => itemType.id === product.productInfo?.itypeid)?.name || 'N/A';

        return { ...product, netto, procWzrostu, replacementParts,  brandName, variantName, categoryName, subcategoryName, itemTypeName };
      });

      setProducts(productsData);
      setTotalItems(data.liczbaWszystkich);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  }, [currentPage, limit, searchQuery, brands, variants, categories, subcategories, itemTypes]);

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

  // Handle search input


// Handle search input changes
  const handleSearchChange = (query) => {
    setSearchQuery(query); // Update the search query state
  };

// Trigger the API call on submit
  const handleSearchSubmit = () => {
    fetchProductData();
  };

  return (
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
              variant="outlined"
              InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                ),
              }}
              size="small"
              placeholder="Search..."
              sx={{ width: '300px' }}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)} // Update the search query
          />
          <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: '5px', height: "3" }}
              onClick={handleSearchSubmit} // Trigger the search
          >
            Search
          </Button>
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
                <TableHead>
                  <TableRow>
                    {/*<TableCell padding="checkbox">*/}
                    {/*  <CustomCheckbox inputProps={{ 'aria-label': 'select all' }} />*/}
                    {/*</TableCell>*/}
                    <TableCell>Id</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>% Increase</TableCell>
                    <TableCell>Replacement Parts</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Price (Netto)</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Variant</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Subcategory</TableCell>
                    <TableCell>Item Type</TableCell>
                  </TableRow>
                </TableHead>
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
                        {/*<TableCell padding="checkbox">*/}
                        {/*  <CustomCheckbox />*/}
                        {/*</TableCell>*/}
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.nazwa}</TableCell>
                        <TableCell>{product.kod}</TableCell>
                        <TableCell>{product.procWzrostu}</TableCell>
                        <TableCell>{product.replacementParts}</TableCell>
                        <TableCell>{product.jednostka}</TableCell>
                        <TableCell>{product.Ilosc}</TableCell>
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
                              <Link to={`/admin/variants/${product.productInfo?.varid}`}>
                                {product.variantName}
                              </Link>
                          ) : (
                              'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          {product.categoryName !== 'N/A' ? (
                              <Link to={`/admin/categories/${product.productInfo?.catid}`}>
                                {product.categoryName}
                              </Link>
                          ) : (
                              'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          {product.subcategoryName !== 'N/A' ? (
                              <Link to={`/admin/subcategories/${product.productInfo?.scatid}`}>
                                {product.subcategoryName}
                              </Link>
                          ) : (
                              'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          {product.itemTypeName !== 'N/A' ? (
                              <Link to={`/admin/item_types/${product.productInfo?.itypeid}`}>
                                {product.itemTypeName}
                              </Link>
                          ) : (
                              'N/A'
                          )}
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
          )}
          {error && <Box sx={{ color: 'red' }}>{error}</Box>}
        </TableContainer>

        <Box display="flex" justifyContent="center" alignItems="center" marginTop={2} gap={2}>
          <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
          >
            Previous
          </Button>

          <Box display="flex" alignItems="center" gap={1}>
            <span>Page</span>
            <TextField
                size="small"
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const page = Math.max(1, Math.min(totalPages, Number(e.target.value))); // Ensure page is within range
                  setCurrentPage(page);
                }}
                onBlur={() => handlePageChange(currentPage)} // Trigger page change on blur
                InputProps={{
                  inputProps: {
                    min: 1,
                    max: totalPages,
                    style: { textAlign: 'center', width: '60px' }, // Inner input styles
                  },
                }}
            />

            <span>of {totalPages}</span>
          </Box>

          <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
          >
            Next
          </Button>
        </Box>


      </div>
  );
};

export default EnovaProductList;
