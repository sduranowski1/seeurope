import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import {useTranslation} from "react-i18next";

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message, errorMessage }) => {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title || "Confirm Action"}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message || "Are you sure you want to proceed?"}</DialogContentText>
                {errorMessage && <DialogContentText style={{ color: "red" }}>{errorMessage}</DialogContentText>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    {t('checkout.cancel')}
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    {t('checkout.confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
