import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import UserManagementToolbar from 'src/components/userManagement/UserManagementToolbar';
import CustomerListResults from '../components/userManagement/CustomerListResults';

const CustomerList = () => (
  <>
    <Helmet>
      <title>Users</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <UserManagementToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default CustomerList;
