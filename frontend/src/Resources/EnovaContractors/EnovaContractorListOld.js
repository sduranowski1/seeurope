import React, {useState, useEffect, useCallback, useMemo} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import {Box, Button, CircularProgress, IconButton, InputAdornment} from "@mui/material";
import ExportButton from "../../Components/AdminExportButton/ExportButton";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import {useNavigate} from "react-router-dom";

const EnovaContractorListOld = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10); // Number of items per page
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [searchNazwa, setSearchNazwa] = useState(""); // Search query state
  const navigate = useNavigate();



  // Debounce timeout variable
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Function to fetch product data from the API
  const fetchProductData = useCallback(async () => {
    setLoading(true); // Set loading true at the start of the request
    try {
      // Construct the query string with current page and limit
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: limit,
        nazwa: searchNazwa,
      });
      // Construct the URL with query parameters for pagination
      const url = `https://se-europe-test.pl/api/enova_contractors?${queryParams}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/ld+json',
          'Accept': 'application/ld+json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching contractors: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched contractors:', data);

      // Extract relevant data
      setProducts(data["hydra:member"]);
      setTotalItems(data["hydra:totalItems"]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  }, [currentPage, limit, searchNazwa]);

  // Call fetchProductData when the component mounts or when the page changes
  useEffect(() => {
    fetchProductData();
  }, [fetchProductData, currentPage, limit]);

  const totalPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit]);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages && !loading) {
      setCurrentPage(page);
    }
  }, [totalPages, loading]);

  const handleSearchChange = (event) => {
    setSearchNazwa(event.target.value.toLowerCase());
  };

  const clearSearchFields = () => {
    setSearchNazwa('');
    // Delay fetchProductData to ensure state is updated first
    setTimeout(() => {
      fetchProductData(); // Refetch the data when clearing the fields
    }, 0);
  };

  const handleRowClick = useCallback((productId) => {
    navigate(`/admin/enova-contractors/${productId}`);
  }, [navigate]);

  return (
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
              placeholder="Search by name..."
              variant="outlined"
              size="small"
              value={searchNazwa}
              InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                ),
              }}
              onChange={handleSearchChange}
              sx={{ width: '300px' }}
          />
          <IconButton onClick={clearSearchFields} size="small" sx={{ marginLeft: '8px' }}>
            <SearchOffIcon />
          </IconButton>
          <ExportButton />
        </Box>

        <TableContainer component={Paper} sx={{ height: 583, position: 'relative' }}>
          {/* Add a fixed height to ensure space is reserved for the spinner */}
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
                  bgcolor="rgba(255, 255, 255, 0.7)" // Slight overlay to make spinner visible
              >
                <CircularProgress />
              </Box>
          )}
          {!loading && !error && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Contrahent Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product, index) => (
                      <TableRow key={index}
                                onClick={() => handleRowClick(product.idEnova)}
                                sx={{
                                  cursor: 'pointer',
                                  '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                  },
                                }}>
                        <TableCell>{product.idEnova}</TableCell>
                        <TableCell>{product.nazwa}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
          )}
        </TableContainer>

        {/* Pagination Controls */}
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

export default EnovaContractorListOld;
