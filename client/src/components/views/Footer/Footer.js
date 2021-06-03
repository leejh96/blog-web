import React from 'react';
import { Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './section/Copyright';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1"> Tel : 010-1111-1111</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

export default Footer