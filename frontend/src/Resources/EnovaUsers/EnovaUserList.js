import React, { useState, useEffect, useCallback } from 'react';
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


const EnovaUserList = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10); // Number of items per page

  // Debounce timeout variable
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Function to fetch product data from both API endpoints
  const fetchProductData = useCallback(async () => {
    setLoading(true); // Set loading true at the start of the request
    try {
      // Fetch the token first
      const response1 = await fetch('https://se-europe-test.pl/api/fetch-enova-token', {
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
      setToken(data1.token); // Adjust as needed based on response structure

      // Fetch the second set of data (products)
      const response2 = await fetch('https://se-europe-test.pl/api/PanelWWW_API/DajLudziKontrahentow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          strona: currentPage,
          limit: limit,
        }),
      });

      if (!response2.ok) {
        throw new Error(`Error in second request: ${response2.statusText}`);
      }

      const data2 = await response2.json();
      console.log('Second response:', data2);

      // Extract the relevant product data
      setProducts(Object.values(data2.elementy || {})); // Convert object to array

      setTotalItems(data2.liczbaWszystkich || 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  }, [currentPage, limit]);

  // Call fetchProductData when the component mounts or when the page changes
  useEffect(() => {
    // Clear any existing debounce timeout to prevent multiple requests
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
                <CustomTableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <CustomCheckbox inputProps={{ 'aria-label': 'select all' }} />
                    </TableCell>
                    <TableCell>Id</TableCell>
                    <TableCell>Contrahent Name</TableCell>
                    {/*<TableCell align="right">Price (Netto)</TableCell>*/}
                  </TableRow>
                </CustomTableHead>
                <TableBody>
                  {products.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell padding="checkbox">
                          <CustomCheckbox />
                        </TableCell>
                        <TableCell>{product.idEnova}</TableCell>
                        <TableCell>{product.nazwa}</TableCell>
                        <TableCell>
                          {product.listaOsobyKontrahenta?.map((osoba, idx) => (
                              <div key={idx}>
                                {osoba.imie} {osoba.nazwisko}
                              </div>
                          )) || "No contacts available"}
                        </TableCell>
                        {/*<TableCell align="right">{product.netto}</TableCell>*/}
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

export default EnovaUserList;
