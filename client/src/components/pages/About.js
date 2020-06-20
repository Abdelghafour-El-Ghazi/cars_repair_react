import React from 'react';
import Box from '@material-ui/core/Box';
const defaultProps = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    style: { width: '5rem', height: '5rem' },
  };
const About = ()=> {
    return (
        <div>
           <Box borderColor="primary.main" borderRadius="borderRadius" {...defaultProps} >Hey</Box>
        </div>
    )
}


export default  About;
