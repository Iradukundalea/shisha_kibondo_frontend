import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems, thirdListItems } from './listItems';
import Chart from './Chart';
import Orders from './Orders';
import Copyright from '../copyright';
import { useSelector, useDispatch } from 'react-redux'
import {useEffect} from 'react'
import { getAdvisors } from '../../redux/actions/AdvisorActions'
import Loading from './Loading'
import AddAdvisor from './AddAdvisor'
import { formattedTimestamp } from '../../utils/formatTime';


function preventDefault(event) {
  event.preventDefault();
}

export default function Advisor() {
  const { advisors, loading } = useSelector((state)=> state.advisorState)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAdvisors())
  },[])

  return (
    <>
    <Grid container spacing={3}>
    {/* Chart */}
    <Grid item xs={12} md={8} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          // height: 240,
        }}
      >
        { loading ? 
        <Loading /> : 
       <>
        {
          !advisors?.length? (<Typography>Currently, no advisor.</Typography>)
          :
          (
            <>
              <Title>Advisors</Title>
              <Table size="small" padding="checkbox">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold'}}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>Sex</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>Address</TableCell>
                  <TableCell sx={{ fontWeight: 'bold'}}>JoinedAt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {advisors?.map((row, index) => (
                  <TableRow key={index} hover={true}>
                    <TableCell>{row?.firstName} {row?.lastName}</TableCell>
                    <TableCell>{row?.email}</TableCell>
                    <TableCell>{row?.sex}</TableCell>
                    <TableCell>{row?.telephone}</TableCell>
                    <TableCell>
                      {row?.province}, {row?.district}, 
                      {row?.sector}, {row?.cell}, 
                      {row?.village}
                    </TableCell>
                    <TableCell>{formattedTimestamp(row?.createdAt)}</TableCell>
                  </TableRow>
                  
                ))}
              </TableBody>
              </Table>
            </>
          )
        }
        
       </>
       } 
      </Paper>
    </Grid>
    
    {/* Recent Deposits */}
    <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          // height: 240,
        }}
      >
        <AddAdvisor />
      </Paper>
    </Grid>

    {/* Recent Orders */}
    <Grid item xs={12}>
      {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> */}
        {/* <Orders /> */}
      {/* </Paper> */}
    </Grid>
    </Grid>
    {/* <Copyright sx={{ pt: 4 }} /> */}
    </>
    
  );
}
