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
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const EnovaUserList = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10); // Number of items per page
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const navigate = useNavigate();
  const [searchImie, setSearchImie] = useState('');
  // const [searchNazwisko, setSearchNazwisko] = useState('');

  // Fetch data with API call
  const fetchProductData = useCallback(async () => {
    setLoading(true); // Set loading true at the start of the request
    try {
      // Construct the query string with current page and limit
      const queryParams = new URLSearchParams({
        strona: currentPage,
        limit: limit,
        imie: searchImie,
        // nazwisko: searchNazwisko,
      });

      // Fetch the second set of data (products) using query parameters
      const response2 = await fetch(`https://se-europe-test.pl/api/enova_people?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/ld+json',
          'Accept': 'application/ld+json',
        },
      });

      if (!response2.ok) {
        throw new Error(`Error in second request: ${response2.statusText}`);
      }

      const data2 = await response2.json();
      console.log('Second response:', data2);

      const productsData = data2["hydra:member"];

      // // Flatten the data to include people with contrahent name
      // const flattenedData = productsData.flatMap((contrahent) =>
      //     (contrahent.listaOsobyKontrahenta || []).map((person) => ({
      //       contrahentName: contrahent.nazwa,
      //       contrahentId: contrahent.idEnova,
      //       ...person,
      //     }))
      // );

      // Extract the relevant product data
      setPeople(productsData);
      setTotalItems(data2["hydra:totalItems"]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  }, [currentPage, limit, searchImie]);


  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const timeout = setTimeout(() => fetchProductData(), 500);
    setDebounceTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [fetchProductData, currentPage, limit, searchImie]);

  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && !loading) setCurrentPage(page);
  };

  console.log(people)
  // const handleSearch = useCallback((query) => {
  //   const filteredPeople = people.filter(person =>
  //       person.imie.toLowerCase().includes(query.toLowerCase()) ||
  //       person.nazwisko.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setPeople(filteredPeople);
  // }, [people]);
  const handleSearchNameChange = (event) => {
    setSearchImie(event.target.value);
  };

  return (
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
              variant="outlined"
              size="small"
              placeholder="Search by name..."
              sx={{ width: '300px' }}
              onChange={handleSearchNameChange} // Debounce in useEffect

          />
          <ExportButton />
        </Box>

        <TableContainer component={Paper} sx={{ height: 583, position: 'relative' }}>
          {loading && (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%" position="absolute" top={0} left={0} right={0} bottom={0} bgcolor="rgba(255, 255, 255, 0.7)">
                <CircularProgress />
              </Box>
          )}
          {error && (
              <Box sx={{ color: 'red', textAlign: 'center', marginBottom: 2 }}>
                Error: {error}
              </Box>
          )}
          {!loading && !error && people.length === 0 && (
              <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                No records found.
              </Box>
          )}
          {!loading && !error && people.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Contractor ID</TableCell>
                    <TableCell>Person Name</TableCell>
                    <TableCell>Person Last Name</TableCell>
                    <TableCell>Contractor Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {people.map((person, index) => (
                      <TableRow
                          key={index}
                          onClick={() => navigate(`/admin/enova-users/${person.id}`)}
                          sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f0f0f0' }}}
                      >
                        <TableCell>{person.id}</TableCell>
                        <TableCell>{person.contractor?.idEnova}</TableCell>
                        <TableCell>{person.imie}</TableCell>
                        <TableCell>{person.nazwisko}</TableCell>
                        <TableCell>{person.contractor?.nazwa}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
          )}
        </TableContainer>

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
