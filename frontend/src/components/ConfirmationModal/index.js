import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmModal = ({
    open,
    handleClose,
    handleConfirm
}) => {

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirmation Modal"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to continue ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleConfirm}>Continue</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleConfirm: PropTypes.func
};

export default ConfirmModal;
