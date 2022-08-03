import { useState, useContext, useEffect } from 'react';
import Buttons from '../../components/Buttons';
import usePermissions from '../../hooks/usePermissions';

import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box
} from '@mui/material';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 170 },
  { id: 'currency', label: 'Currency', minWidth: 170 }
];

const data = [
  {name: 'first', price: 'price', currency: 'asdasdas'}
];

const Products = () => {
  const [permissions] = usePermissions();
  console.log(permissions, 'permissions');

  return (
    <Box style={{
      margin: '5% 2% 5% 2%',
    }}>
      <Buttons
        permissions={permissions}
      />
      <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                    <TableCell
                        key={column.name}
                        >
                        {column.label}
                    </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((curr) => {
              return (
                  <TableRow 
                    hover 
                    role="checkbox" 
                    key={curr.name}
                  >
                    <TableCell key={curr.name}>
                      {curr.name}
                    </TableCell>
                    <TableCell key={curr.name}>
                      {curr.price}
                    </TableCell>
                    <TableCell key={curr.name}>
                      {curr.currency}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </Box>
  );
};

export default Products;
