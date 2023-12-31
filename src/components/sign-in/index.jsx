import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../copyright';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { LoginAuthAction } from '../../redux/actions/AuthAction'

// import useSocket from '../../hooks/useSocket'

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)

  const state = useSelector((state)=> state.authState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const email = data.get('email')
    const  password = data.get('password')
    console.log('Credentials', {
      email,
      password
    })

    dispatch(LoginAuthAction({email, password}, navigate))
  };

  const toogleShowPassword =()=>{
    setShowPassword(!showPassword)
  }

  //
  // const { socket } = useSocket();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign into Shisha
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={!showPassword && "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}

            />
            <Typography
              sx={{
                cursor: 'pointer',
                position: 'relative',
                top: '-45px',
                left: '345px'
              }}
              onClick={toogleShowPassword}
            > {!showPassword ? 'Show': 'Hide'}
            </Typography>
           
            {state.loading ? (
              <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              disabled
            >
              LogingIn...
            </Button>
            ): 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // disabled
            >
              Sign In
            </Button>
          }

          {/* {
            state.error ? (
            <Typography component="h1" variant="h5">
              {state.error}
            </Typography>): ''
          } */}
          
            <Grid container>
              <Grid item xs>
                <Link href="/auth/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}