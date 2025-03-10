import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Button, Box } from '@mui/material';
import i18n from "i18next";

const OrderItemsModal = ({ open, onClose, items }) => {

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
                <h3>Order Items</h3>
                <hr/>
                {items.length > 0 ? (
                    <ul   style={{color: "gray", listStyleType: "disc", paddingLeft: "20px"}}>
                        {items.map((item, index) => (
                            <li key={index} style={{paddingBottom: "15px"}}>
                                <strong style={{color: "black"}}>{i18n.language === "en"
                                    ? item.productInfo?.englishTitle || item.name
                                    : i18n.language === "de"
                                        ? item.productInfo?.germanTitle || item.name
                                        // : item.name} {item.towarEnovaId}</strong> - {item.ilosc} x {item.cena}
                                        : item.name} {item?.enovaProduct?.name}</strong>  -  {item.ilosc} x {item.cena}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items in this order</p>
                )}
                <Button onClick={onClose}>Close</Button>
            </Box>
        </Modal>
    );
};

export default OrderItemsModal;
