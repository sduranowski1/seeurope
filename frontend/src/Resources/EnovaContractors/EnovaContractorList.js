import React, { useState, useEffect, useCallback } from 'react';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import { Box, Button, CircularProgress } from "@mui/material";
import ExportButton from "../../Components/AdminExportButton/ExportButton";

const EnovaContractorList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10); // Number of items per page

  // Debounce timeout variable
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Function to fetch product data from the API
  const fetchProductData = useCallback(async () => {
    setLoading(true); // Set loading true at the start of the request
    try {
      // Construct the URL with query parameters for pagination
      const url = `https://se-europe-test.pl/api/enova_contractors?strona=${currentPage}&limit=${limit}`;

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
  }, [currentPage, limit]);

  // Call fetchProductData when the component mounts or when the page changes
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new debounce timeout
    const timeout = setTimeout(() => {
      fetchProductData();
    }, 500); // 500ms debounce delay

    setDebounceTimeout(timeout);

    return () => {
      clearTimeout(timeout); // Clean up on component unmount or dependency change
    };
  }, [fetchProductData, currentPage, limit]);

  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && !loading) {
      setCurrentPage(page);
    }
  };

  return (
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
                      <TableRow key={index}>
                        <TableCell>{product.idEnova}</TableCell>
                        <TableCell>{product.nazwa}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
          )}
        </TableContainer>

        {/* Pagination Controls */}
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
          >
            Previous
          </Button>
          <Box display="flex" alignItems="center" marginX={2}>
          <span>
            Page {currentPage} of {totalPages}
          </span>
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

export default EnovaContractorList;
