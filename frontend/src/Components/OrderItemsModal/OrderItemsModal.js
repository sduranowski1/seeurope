import React, {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import { Button, Box } from '@mui/material';
import i18n from "i18next";

const OrderItemsModal = ({ open, onClose, items }) => {
    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open || items.length === 0) return;

        setLoading(true);
        const fetchProductNames = async () => {
            try {
                const response = await fetch('https://se-europe-test.pl/api/enova_products/no_pagination');
                const data = await response.json();

                // Convert API response into a lookup object { id: name }
                const productMap = {};
                data.forEach(product => {
                    productMap[product.id] = product.name;
                });

                setProductData(productMap);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductNames();
    }, [open, items]);

    console.log(productData)

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
                {items.length > 0 ? (
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>
                                <strong>
                                    {productData[item.towarEnovaId] || "Unknown Product"} ({item.towarEnovaId})
                                </strong> - {item.ilosc} x {item.cena}
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
