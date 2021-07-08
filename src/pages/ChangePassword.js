import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';

async function ali() {
  await console.log('ali');
  return 'a';
}

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Change Password</title>
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
              OTP: '',
              password: '',
              confirm: ''
            }}
            validationSchema={Yup.object().shape({
              OTP: Yup.string().required('OTP is required'),
              password: Yup.string().max(255).required('Password is required'),
              confirm: Yup.string().max(255).oneOf([Yup.ref('password'), null], 'Password must match').required('Confirm Password is required')
            })}
            onSubmit={async (values, { setFieldError }) => {
              console.log(values);
              setFieldError('OTP', 'hi majid');
              await setTimeout(await ali(), 5000);
              navigate('/change-password', { replace: true });
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
                    Change Password
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.OTP && errors.OTP)}
                  fullWidth
                  helperText={touched.OTP && errors.OTP}
                  label="OTP"
                  margin="normal"
                  name="OTP"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.OTP}
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
                <TextField
                  error={Boolean(touched.confirm && errors.confirm)}
                  fullWidth
                  helperText={touched.confirm && errors.confirm}
                  label="Confirm Password"
                  margin="normal"
                  name="confirm"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.confirm}
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
                    Change Password
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
