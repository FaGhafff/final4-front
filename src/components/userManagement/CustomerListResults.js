import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import axios from 'axios';

function CustomerListResults({ ...rest }) {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [data] = useState(1);
  const [responseData, setResponseData] = useState({ hits: [] });
  const [cached, setCached] = useState(false);

  useEffect(() => {
    const results = async () => {
      const d = await axios.get('http://localhost:8080/api/users');
      setResponseData(d.data);
    };
    results().then((r) => console.log(r));
    console.log('use effect');
    console.log(responseData);
    setCached(true);
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = data.list.map((user) => user.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  if (!cached) {
    return (
      <h1>nadarim data</h1>
    );
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === data.list.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < data.list.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  First Name
                </TableCell>
                <TableCell>
                  Last Name
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Phone Number
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.list.map((user) => (
                <TableRow
                  hover
                  key={user.id}
                  selected={selectedCustomerIds.indexOf(user.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(user.id) !== -1}
                      onChange={(event) => handleSelectOne(event, user.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {user.firstName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {`${user.address.city}, ${user.address.state}, ${user.address.country}`}
                  </TableCell>
                  <TableCell>
                    {user.phone}
                  </TableCell>
                  <TableCell>
                    {moment(user.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={data.size}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
export default CustomerListResults;
