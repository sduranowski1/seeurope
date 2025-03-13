import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Button, Box } from '@mui/material';
import i18n from "i18next";
import {useTranslation} from "react-i18next";

const OrderItemsModal = ({ open, onClose, items }) => {
    const { t } = useTranslation();

    console.log(items)
    return (
        <Modal open={open} onClose={onClose}>
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
                <h3>{t('ordersPanel.orderItems')}</h3>
                <hr/>
                {items.length > 0 ? (
                    <ul   style={{color: "gray", listStyleType: "disc", paddingLeft: "20px"}}>
                        {items.map((item, index) => (
                            <li key={index} style={{paddingBottom: "15px"}}>
                                <strong style={{color: "black"}}>
                                    {item?.enovaProduct?.code} - {i18n.language === "en"
                                        ? item?.enovaProduct?.features?.find(feature => feature.nazwa === "Nazwa w EN")?.wartosc || item?.enovaProduct?.name
                                        : i18n.language === "de"
                                            ? item?.enovaProduct?.features?.find(feature => feature.nazwa === "Nazwa w DE")?.wartosc || item?.enovaProduct?.name
                                            : item?.enovaProduct?.name} </strong>  -  {item.quantity} x {item.price}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items in this order</p>
                )}
                <Button onClick={onClose}>{t('ordersPanel.close')}</Button>
            </Box>
        </Modal>
    );
};

export default OrderItemsModal;
