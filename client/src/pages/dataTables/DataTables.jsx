import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect } from "react";
import { Autocomplete, Box, Card, CardContent, TextField } from "@mui/material";
import { useState } from "react";
import "./style.scss";

export default function DataTables() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [rowdata, setRowdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/api/v1/user/all-users`
      );
      setRows(result.data);
      // console.log(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (rowdata) {
      setRows([rowdata]);
    } else {
      const fetchData = async () => {
        const result = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/user/all-users`
        );
        setRows(result.data);
        // console.log(result.data);
      };
      fetchData();
    }
  }, [rowdata]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {rows ? (
        <Card sx={{ minWidth: 900, m: 4 }} className="cardContainer">
          <Box
            component="span"
            m={1}
            display="flex"
            justifyContent="end"
            pr={1}
            pt={1}
          >
            <Autocomplete
              className="boxContainer"
              disablePortal
              id="combo-box-demo"
              options={rows}
              onChange={(e, v) => setRowdata(v)}
              getOptionLabel={(rows) => rows.name || ""}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Name" />}
            />
          </Box>
          <CardContent>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer className="cardContent">
                <Table stickyHeader aria-label="sticky table" className="table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" className="tableCell">
                        Name
                      </TableCell>
                      <TableCell align="center" className="tableCell">
                        Age/Sex
                      </TableCell>
                      <TableCell align="center" className="tableCell">
                        Mobile
                      </TableCell>
                      <TableCell align="center" className="tableCell">
                        Address
                      </TableCell>
                      <TableCell align="center" className="tableCell">
                        Govt ID
                      </TableCell>
                      <TableCell align="center" className="tableCell">
                        Guardian Details
                      </TableCell>
                      <TableCell align="center" className="tableCell">
                        Nationality
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell align="center" className="tablecell">
                              {row.name}
                            </TableCell>
                            <TableCell align="center" className="tablecell">
                              {`${row.age}Y / ${row.gender}`}
                            </TableCell>
                            <TableCell align="center" className="tablecell">
                              {row.mobile}
                            </TableCell>
                            <TableCell align="center" className="tablecell">
                              {`${row.address}, ${row.state}, ${row.city}, ${row.country}, ${row.pincode}`}
                            </TableCell>
                            <TableCell align="center" className="tablecell">
                              {`${row.idtype}: ${row.idnumber}`}
                            </TableCell>
                            <TableCell align="center" className="tablecell">
                              {`${row.guardianNameLabel} ${row.guardianName}, ${row.guardianEmail}, ${row.emergencyNumber}`}
                            </TableCell>
                            <TableCell align="center" className="tablecell">
                              {row.nationality}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </CardContent>
        </Card>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}
