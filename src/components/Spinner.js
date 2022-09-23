import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ 
        display: 'flex', 
        margin: 'auto', 
        width: '100%', 
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column'
        }}>
      <CircularProgress />
      <h2>Cargando....</h2>
    </Box>
  );
}
