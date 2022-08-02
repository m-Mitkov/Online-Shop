import * as React from 'react';
import PropTypes from 'prop-types';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const permissions = [
    'Create',
    'Read',
    'Update',
    'Delete'
];

const Permissions = ({
    handleChange,
    data
}) => {
  return (
    <div>
      <FormControl sx={{ width: '100%'}}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={data}
              onChange={handleChange}
              input={<OutlinedInput label="Pemissions" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
                {permissions.map((curr) => (
                    <MenuItem key={curr} value={curr}>
                        <Checkbox checked={data.indexOf(curr) > -1} />
                        <ListItemText primary={curr} />
                    </MenuItem>
                ))}
            </Select>
      </FormControl>
    </div>
  );
};

Permissions.propTypes = {
    handleChange: PropTypes.func
};

export default Permissions;