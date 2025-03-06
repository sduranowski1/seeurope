import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message, errorMessage }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title || "Confirm Action"}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message || "Are you sure you want to proceed?"}</DialogContentText>
                {errorMessage && <DialogContentText style={{ color: "red" }}>{errorMessage}</DialogContentText>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
