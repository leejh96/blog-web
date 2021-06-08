import React from 'react';
import { Typography, Container } from '@material-ui/core'
import Copyright from './section/Copyright';

function Footer(){ 
  return (
    <div>
      <footer style={{
        marginTop: 'auto'
      }}>
        <Container maxWidth="sm">
          <Typography variant="body1"> Tel : 010-1111-1111</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}

export default Footer