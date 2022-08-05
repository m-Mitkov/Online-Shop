import * as React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Grid
} from '@mui/material';

const Buttons = ({
  permissions = [],
  handleClick,
  selectedProduct
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
              <Grid item xs={0.6} style={{
                marginLeft: '2%',
                marginRight: '2%',
                marginBottom: '2%'
              }}>
                <Button 
                  variant="outlined"
                  onClick={() => handleClick(curr)}
                  disabled={
                    !(selectedProduct._id !== '') &&
                    curr !== 'Create'
                  }
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
        ? getButtons()
        : null
  );
};

Buttons.propTypes = {
  permissions: PropTypes.array,
  handleClick: PropTypes.func,
  selectedProduct: PropTypes.object
};

export default Buttons;
