import React, {useState, useEffect, useCallback} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    CircularProgress,
    Typography, IconButton
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EnovaUserById from "./EnovaUserById"; // Import Quill styles

const EnovaUserEdit = () => {
    const {id} = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [productId, setProductId] = useState(null);
    const [brands, setBrands] = useState([]);
    const [variants, setVariants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    // const [token, setToken] = useState(null);
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState(null);
    const [descriptions, setDescriptions] = useState({
        en: '', // English description
        pl: '', // Polish description
    });



    useEffect(() => {
        const fetchProductData = async () => {
            try {
                // Fetch the product details by ID
                const response = await fetch(`https://se-europe-test.pl/api/user_enovas/${id}`);
                const productData = await response.json();
                setProduct(productData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
            console.log("Token from localStorage:", token);

            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            // Prepare the updated product data
            const updatedProduct = {
                email: product.email,
                plainPassword: product.plainPassword,
            };

            console.log("Payload being sent:", JSON.stringify(updatedProduct));

            // Send the PATCH request
            const productUpdateResponse = await fetch(`https://se-europe-test.pl/api/user_enovas/${id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/merge-patch+json', // Ensure correct Content-Type
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!productUpdateResponse.ok) {
                const errorResponse = await productUpdateResponse.json();
                console.error('Error response:', errorResponse);
                throw new Error('Product update failed');
            }

            console.log('Product updated successfully');
            navigate('/admin/enova-products'); // Redirect after successful update
        } catch (error) {
            console.error('Error saving product:', error);
            alert(`Error: ${error.message}`);
        }
    };




    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh" // Or use specific height if you want it in a smaller area
                width="100%"
            >
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <div>
            <Box display="flex" justifyContent="space-between" sx={{padding: 2}}>
                {/* Form Container */}
                <Box sx={{
                    flex: 1,
                    marginRight: 2,
                    height: 'calc(100vh - 96px)',
                    overflow: 'auto', // Allows scrolling
                    '::-webkit-scrollbar': {
                        display: 'none', // Hides scrollbar in WebKit browsers (Chrome, Safari)
                    },
                    scrollbarWidth: 'none', // Hides scrollbar in Firefox
                }}>
                    <EnovaUserById /> {/* Assuming this component renders your table */}
                </Box>

                {/* Sticky Section */}
                <Box sx={{flex: 1, maxWidth: 600, position: 'sticky', top: 16}}>
                    <Box component="form" sx={{maxWidth: '100%'}}>
                        <FormControl fullWidth margin="normal">
                            {/*<InputLabel id="brand-label">Email</InputLabel>*/}
                            <TextField id="filled-basic" name="email" value={product?.email || ''}   onChange={handleChange} // Connect the change handler
                                        label="Login Email" variant="filled" />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            {/*<InputLabel id="brand-label">Email</InputLabel>*/}
                            <TextField id="filled-basic" name="plainPassword" value={product?.plainPassword || ''}   onChange={handleChange} // Connect the change handler
                                       label="Change password" variant="filled" />
                        </FormControl>

                        <Box display="flex" justifyContent="space-between" marginTop={2}>
                            <Button variant="outlined" onClick={() => navigate('/admin/enova-products')}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </div>
    );
};
export default EnovaUserEdit;
