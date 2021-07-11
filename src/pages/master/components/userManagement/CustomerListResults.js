import React, { useEffect, useState } from 'react';
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
import Button from '@material-ui/core/Button';

export default function CustomerListResults({ ...rest }) {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [cached, setCached] = useState(false);

  useEffect(() => {
    const results = async () => {
      const d = await axios.get('http://localhost:8080/api/users?name=&page=0&pageSize=100');
      setData(d.data);
    };
    results().then((r) => console.log(r));
    setLimit(100);
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

  const handleDelete = (u) => {
    const nList = [];
    data.list.forEach((user) => {
      if (user.username !== u) {
        nList.push(user);
      }
    });
    data.list = nList;
    console.log('ended');
    console.log(data.list);
  };

  if (data === undefined) {
    return (
      <h3>fetching data...</h3>
    );
  } else {
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
                  <TableCell>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(data.list)}
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
                      {user.firstName}
                    </TableCell>
                    <TableCell>
                      {user.lastName}
                    </TableCell>
                    <TableCell>
                      {user.username}
                    </TableCell>
                    <TableCell>
                      {user.phoneNum}
                    </TableCell>
                    <TableCell>
                      {user.role}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => { handleDelete(user.username); }}
                      >
                        delete User
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        {console.log(data)}
        <TablePagination
          component="div"
          count={data.pageSize}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={data.page}
          rowsPerPage={limit}
          rowsPerPageOptions={[100, 50, 25]}
        />
      </Card>
    );
  }
}
