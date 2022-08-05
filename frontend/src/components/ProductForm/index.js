import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { TextField, Button, Grid } from '@mui/material';
import ConfirmModal from '../ConfirmationModal';

import style from './ProductForm.module.css';

const ProductForm = ({
    typeAction = '',
    buttonLabel = '',
    fomTitle = '',
    data,
    handleSubmitForm,
    handleClose
}) => {

    const [formData, setFormData] = useState(data);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value })
    };

    const handleSubmitInner = (e) => {
        e.preventDefault();
    };

    const handleCloseModal = () => {
        return setOpenConfirmModal(false);
    };

    const handleConfirmModalAgree = () => {
        setOpenConfirmModal(false);
        return handleSubmitForm(formData);
    };

    const handleClickAgreeButton = () => {
        setOpenConfirmModal(true);
    }

    return (
        <div className={style.formWrapper}>

            <ConfirmModal 
                open={openConfirmModal}
                handleClose={handleCloseModal}
                handleConfirm={handleConfirmModalAgree}
            />

            <h1 className={style.title}>{fomTitle}</h1>

            <form className={style.form} onSubmit={handleSubmitInner} >

                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Name"
                    name="name"
                    autoFocus
                    className={style.inputField}
                    value={formData['name']}
                    onChange={handleChange}
                />

                <TextField
                    variant="outlined"
                    type="number"
                    margin="normal"
                    fullWidth
                    label="Price"
                    name="price"
                    autoFocus
                    className={style.inputField}
                    value={formData['price']}
                    onChange={handleChange}
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Currency"
                    name="currency"
                    autoFocus
                    className={style.inputField}
                    value={formData['currency']}
                    onChange={handleChange}
                />
                {
                    typeAction === 'Read'
                        ? null
                        : <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{
                                marginBottom: '3%'
                            }}
                            // onClick={() => handleSubmitForm(formData)}
                            onClick={handleClickAgreeButton}
                        >
                            {buttonLabel}
                        </Button>
                }
            <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                >
                    Close
            </Button>
            </form>
        </div>
    );
}

ProductForm.propTypes = {
    buttonLabel: PropTypes.string,
    fomTitle: PropTypes.string,
    data: PropTypes.object,
    handleSubmitForm: PropTypes.func
};

export default ProductForm;


