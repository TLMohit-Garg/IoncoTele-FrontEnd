// import React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Container,
//   Paper,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from '@mui/material';

// // Define the shape of form data
// interface SignInForm {
//   provider: string;
//   email: string;
//   password: string;
// }

// // Define validation schema
// const schema = yup.object().shape({
//   provider: yup.string().required('Provider is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });

// // Define the signIn function
// const signInWithProvider = async (provider: string) => {
//   // Simulate an API call for signing in
//   return new Promise<void>((resolve) => {
//     setTimeout(() => {
//       console.log(`Sign in with ${provider}`);
//       resolve();
//     }, 500);
//   });
// };

// const SignIn: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInForm>({
//     resolver: yupResolver(schema),
//   });

//   // Define the submission handler
//   const onSubmit: SubmitHandler<SignInForm> = async (data) => {
//     if (data.provider === 'credentials') {
//       console.log(data); // Replace with your email/password sign-in logic
//     } else {
//       await signInWithProvider(data.provider);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={3} style={{ padding: '20px' }}>
//         <Typography variant="h5">Sign In</Typography>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <FormControl fullWidth variant="outlined" margin="normal">
//             <InputLabel>Provider</InputLabel>
//             <Select
//               {...register('provider')}
//               error={!!errors.provider}
//               defaultValue=""
//             >
//               <MenuItem value="" disabled>Select Provider</MenuItem>
//               <MenuItem value="github">GitHub</MenuItem>
//               <MenuItem value="google">Google</MenuItem>
//               <MenuItem value="credentials">Email and Password</MenuItem>
//             </Select>
//             {errors.provider && <Typography color="error">{errors.provider.message}</Typography>}
//           </FormControl>

//           <Box mb={2}>
//             <TextField
//               label="Email"
//               fullWidth
//               variant="outlined"
//               {...register('email')}
//               error={!!errors.email}
//               helperText={errors.email ? errors.email.message : ''}
//             />
//           </Box>
//           <Box mb={2}>
//             <TextField
//               label="Password"
//               type="password"
//               fullWidth
//               variant="outlined"
//               {...register('password')}
//               error={!!errors.password}
//               helperText={errors.password ? errors.password.message : ''}
//             />
//           </Box>
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Sign In
//           </Button>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default SignIn;

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Divider,
  Checkbox,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
// import googleLogo from './path/to/google-logo.png'; // Uncomment and update the path for the Google logo

// Define the shape of form data
interface SignInForm {
  email: string;
  password: string;
}

// Define validation schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// Define the signIn function
const signInWithProvider = async (provider: string) => {
  // Simulate an API call for signing in
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider}`);
      resolve();
    }, 500);
  });
};

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: yupResolver(schema),
  });

  // Define the submission handler
  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    console.log(data); // Replace with your email/password sign-in logic
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop:"10px", marginBottom:"20px" }}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
      <LockIcon fontSize="large" />
    </Box>
        <Typography variant="h5" align="center">Sign In</Typography>
        <Typography variant="h6" align="center">Welcome user, please sign in to continue</Typography>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
          </Box>
          <Box mb={2} display="flex" alignItems="center">
            
          <Checkbox {...label} /><Typography>Remember me</Typography>
          </Box>

        {/* OR Line */}
          <Box textAlign="center" marginY={2}>
          <Divider>OR</Divider>
          </Box>

          {/* Sign In with Google Button */}
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            style={{ textTransform: 'none', marginBottom: '16px' }}
            onClick={() => signInWithProvider('google')} // Add your sign in logic here
          >
            {/* <img src={googleLogo} alt="Google" style={{ width: '20px', marginRight: '8px' }} /> */}
            Sign In with Google
          </Button>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;

