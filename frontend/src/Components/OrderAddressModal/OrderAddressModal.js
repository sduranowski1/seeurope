import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Button, Box } from '@mui/material';
import i18n from "i18next";
import {useTranslation} from "react-i18next";

const OrderAddressModal = ({ openAddress, onCloseAddress, addresses }) => {
    const { t } = useTranslation();

    console.log(addresses)
    return (
        <Modal open={openAddress} onClose={onCloseAddress}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                width: '300px'
            }}>
                <h3>Address</h3>


                <br/>
                {Object.entries(addresses).map(([key, value]) => (
                    <ul key={key}>
                        <li>
                            <strong>{key}:</strong> {value}
                        </li>
                    </ul>
                ))}
                <Button onClick={onCloseAddress}>{t('ordersPanel.close')}</Button>
            </Box>
        </Modal>
    );
};

export default OrderAddressModal;
