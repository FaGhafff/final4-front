import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('Username is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setFieldError }) => {
              const p = await axios({
                method: 'post',
                url: 'http://localhost:8080/login',
                header: {},
                data: {
                  userName: values.username,
                  password: values.password
                }
              }).then((value) => {
                localStorage.setItem('username',value.data.username);
                localStorage.setItem('role',value.data.role);
                localStorage.setItem('token',value.data.token);
                localStorage.setItem('expireAt',value.data.expireAt);
                console.log(value);
                switch (value.data.role) {
                  case "ROLE_ADMIN":
                    navigate('/app/admin/dashboard', { replace: true });
                    break;
                  case "ROLE_STUDENT":
                    navigate('/app/student/dashboard', { replace: true });
                    break;
                  case "ROLE_MASTER":
                    navigate('/app/master/dashboard', { replace: true });
                    break;
                  default:
                    navigate('/404', { replace: true });
                }
              }).catch((e) => {
                setFieldError('password', e.message);
              });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Forget your Password?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/forget-password"
                    variant="h6"
                  >
                    Reset Password
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
