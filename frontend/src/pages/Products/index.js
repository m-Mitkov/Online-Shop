import { useState, useContext, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

import Buttons from '../../components/Buttons';
import ProductForm from '../../components/ProductForm';
import usePermissions from '../../hooks/usePermissions';
import { Context } from '../../Store';
import {
  fetchProducts,
  createProduct,
  selectProduct,
  updateProduct,
  deleteProduct
} from '../../actions/productActions';

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
  { id: 'name', label: 'Name' },
  { id: 'price', label: 'Price' },
  { id: 'currency', label: 'Currency' }
]; // TODO: think about moving in
  // store and read it from there?

const data = [
  {name: 'first', price: 'price', currency: 'asdasdas'}
];

const defaultStateForm = {
  open: false,
  key: '',
  typeAction: '',
  buttonLabel: 'asd',
  fomTitle: '',
  data: {},
  handleSubmitForm: ''
};

const eventToActionMapper = { // create, update, delete
  'Create': createProduct,
  'Update': updateProduct,
  'Delete': deleteProduct
};

const Products = () => {
  const navigate = useNavigate ();
  const [permissions] = usePermissions();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: ''
  });
  const [openForm, setOpenForm] = useState(defaultStateForm);

  const { product, notification, auth } = useContext(Context);
  const [productData, productDispatch] = product;
  const [, notifyDispatch] = notification;
  const [user, authDispatch] = auth;
  const userToJS = user.toJS();

  const productsToJs = productData.toJS();
  const {
    product: selectedProduct = {},
    products = []
  } = productsToJs;

  useEffect(() => {
     if (userToJS._id !== '') {
       fetchProducts(
         productDispatch,
         notifyDispatch,
         navigate,
         userToJS['x-auth-token']
       );
     }
  }, []);

  const handleSubmitForm = async (data) => {
    // setFormData(data);
    await eventToActionMapper[openForm['key']](
      productDispatch,
      notifyDispatch,
      navigate,
      user.toJS()['x-auth-token'],
      data,
      selectedProduct._id // for update/delete
    );
    setOpenForm(defaultStateForm);
  };

  const handleButtonClick = (event) => {
    setOpenForm({
      open: true,
      key: event,
      typeAction: '',
      buttonLabel: event.toUpperCase(),
      fomTitle: event.toUpperCase(),
      data: selectedProduct,
      handleSubmitForm: eventToActionMapper[event]
    });
  };

  const handleCloseForm = () => {
    setOpenForm(defaultStateForm);
  };

  const handleRowClick = (rowData) => {
    selectProduct(productDispatch, rowData);
  };

  return (
    <>
      {
        openForm.open === true && <ProductForm 
          typeAction={openForm.key}
          buttonLabel={openForm.buttonLabel}
          fomTitle={openForm.fomTitle}
          data={openForm.data}
          handleSubmitForm={handleSubmitForm}
          handleClose={handleCloseForm}
        /> 
      }
      <Box style={{
        margin: '5% 2% 5% 2%',
        display: openForm.open === true ? 'none' : 'block'
      }}>
        <Buttons
          permissions={permissions}
          handleClick={handleButtonClick}
          selectedProduct={selectedProduct}
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
              {products.map((curr) => {
                return (
                    <TableRow 
                      hover 
                      role="checkbox" 
                      key={curr._id}
                      onClick={() => handleRowClick(curr)}
                      style={{
                        backgroundColor: 
                          selectedProduct._id === curr._id
                          ? '#ffffe0'
                          : '' 
                      }}
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
  </>
  );
};

export default Products;
