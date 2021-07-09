import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';

const AddUser = (props) => {
  const [values, setValues] = useState({
    firstName: 'amin',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '00',
    country: 'USA',
    role: 'master'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Username and password are generated automatically and send to the user via SMS."
          title="Add User"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true
                }}
                label="First name"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
                variant="outlined"

              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true
                }}
                label="Last name"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                inputProps={{
                  readOnly: true
                }}
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true
                }}
                label="Phone Number"
                name="phone"
                defaultValue="0"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true
                }}
                label="Role"
                name="role"
                onChange={handleChange}
                value={values.role}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

export default AddUser;
