import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import React from 'react';
import Modal from '@material-ui/core/Modal';

export default function UserManagementToolbar(props) {
  const [openImport, setOpenImport] = React.useState(false);

  const handleCloseImport = () => {
    setOpenImport(false);
  };

  const handleOpenImport = () => {
    setOpenImport(true);
  };

  const [openImportCsv, setOpenImportCsv] = React.useState(false);

  const handleCloseCSV = () => {
    setOpenImportCsv(false);
  };

  const handleOpenCSV = () => {
    setOpenImportCsv(true);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          onClick={handleOpenImport}
          color="primary"
          variant="contained"
        >
          Add
        </Button>
        <Modal
          onClose={handleCloseImport}
          open={openImport}
          style={{
            position: 'absolute',
            border: '2px solid #000',
            backgroundColor: 'white',
            boxShadow: '2px solid black',
            height: 80,
            width: 240,
            margin: 'auto'
          }}
        >
          <h2>How are you?</h2>
        </Modal>
        <Button
          sx={{ mx: 1 }}
          onClick={handleOpenCSV}
        >
          Import From CSV file
        </Button>
        <Modal
          onClose={handleCloseCSV}
          open={openImportCsv}
          style={{
            position: 'absolute',
            border: '2px solid #000',
            backgroundColor: 'white',
            boxShadow: '2px solid black',
            height: 80,
            width: 240,
            margin: 'auto'
          }}
        >
          <h2>How are you?</h2>
        </Modal>
      </Box>

    </Box>
  );
}
