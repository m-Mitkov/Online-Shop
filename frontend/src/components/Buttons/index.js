import * as React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Grid
} from '@mui/material';

const Buttons = ({
  permissions = []
}) => {

  const getButtons = () => {
    return (
      <Grid 
      container
      direction="row-reverse"
      rowSpacing={5}
      >
        {
          permissions.map(curr => {
            return(
              <Grid item xs={0.6}>
                <Button 
                  variant="outlined"
                >
                  {curr}
                </Button>
              </Grid>
            );
          })
        }
      </Grid>
    );
  };

  return (
      permissions !== []
        ? getButtons
        : null
  );
};

Buttons.propTypes = {
  permissions: PropTypes.array
};

export default Buttons;
