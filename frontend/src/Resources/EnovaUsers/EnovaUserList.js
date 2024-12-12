import React, { useState, useEffect, useCallback } from 'react';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress, Box } from "@mui/material";

const EnovaUserList = () => {
  const [people, setPeople] = useState([]); // Flattened list of people with contrahents
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10); // Number of items per page

  const fetchProductData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://se-europe-test.pl/api/PanelWWW_API/DajKontrahentow', {
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

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const productsData = data.elementy || [];

      // Flatten the data to include people with contrahent name
      const flattenedData = productsData.flatMap((contrahent) =>
          (contrahent.listaOsobyKontrahenta || []).map((person) => ({
            contrahentName: contrahent.nazwa,
            contrahentId: contrahent.idEnova,
            ...person,
          }))
      );

      setPeople(flattenedData);
      setTotalItems(data.liczbaWszystkich);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && !loading) {
      setCurrentPage(page);
    }
  };

  return (
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          {/* Add export or other controls here */}
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
                    <TableCell>Contrahent ID</TableCell>
                    <TableCell>Contrahent Name</TableCell>
                    <TableCell>Person Name</TableCell>
                    <TableCell>Person Last Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {people.map((person, index) => (
                      <TableRow key={index}>
                        <TableCell>{person.contrahentId}</TableCell>
                        <TableCell>{person.contrahentName}</TableCell>
                        <TableCell>{person.imie}</TableCell>
                        <TableCell>{person.nazwisko}</TableCell>
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
