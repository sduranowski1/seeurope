import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const EnovaProductEdit = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [brands, setBrands] = useState([]);
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                // Fetch the product details by ID
                const response = await fetch(`https://127.0.0.1:8000/api/product_infos/${id}`);
                const productData = await response.json();
                setProduct(productData);

                // Fetch brands and variants data
                const [brandsResponse, variantsResponse] = await Promise.all([
                    fetch('https://127.0.0.1:8000/api/brands'),
                    fetch('https://127.0.0.1:8000/api/variants')
                ]);
                const brandsData = await brandsResponse.json();
                const variantsData = await variantsResponse.json();
                setBrands(brandsData);
                setVariants(variantsData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    const handleChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Set image preview
        }
    };

    const handleSave = async () => {
        try {
            console.log('Uploading file:', image.name);
            // Upload the image and get the image ID if needed
            let imageId = product.imageId; // Default to the existing image ID if no new image is uploaded

            if (image) {
                const formData = new FormData();
                formData.append('file', image); // Append the image file

                const imageUploadResponse = await fetch('https://127.0.0.1:8000/api/media_objects', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData,
                });

                // Log the full response object for debugging
                console.log('Full response:', imageUploadResponse);

                if (!imageUploadResponse.ok) {
                    throw new Error('Image upload failed');
                }

                const result = await imageUploadResponse.json();
                console.log('Upload result:', result);

                const filePath = result.contentUrl;
                console.log(filePath)
                imageId = result.contentUrl
            }

            // Create the payload for updating the product
            const updatedProduct = {
                braid: product.braid,
                varid: product.varid,
                catid: product.catid,
                imagePath: imageId, // Only the image ID as a string
            };

            // Send the PUT request to update the product
            const productUpdateResponse = await fetch(`https://127.0.0.1:8000/api/product_infos/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!productUpdateResponse.ok) {
                throw new Error('Product update failed');
            }

            console.log('Product updated successfully');
            // Redirect after saving
            navigate('/admin/enova-products');
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };




    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box component="form" sx={{ maxWidth: 600, margin: 'auto' }}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="brand-label">Brand</InputLabel>
                <Select
                    labelId="brand-label"
                    name="braid"
                    value={product?.braid || ''}
                    onChange={handleChange}
                    label="Brand"
                >
                    {brands.map((brand) => (
                        <MenuItem key={brand.id} value={brand.id}>
                            {brand.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel id="variant-label">Variant</InputLabel>
                <Select
                    labelId="variant-label"
                    name="varid"
                    value={product?.varid || ''}
                    onChange={handleChange}
                    label="Variant"
                >
                    {variants.map((variant) => (
                        <MenuItem key={variant.id} value={variant.id}>
                            {variant.variantname}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                margin="normal"
                label="Category"
                name="category"
                value={product?.category || ''}
                onChange={handleChange}
            />

            {/* Image Upload */}
            <Box marginTop={2}>
                <input
                    accept="image/*"
                    id="upload-image"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <label htmlFor="upload-image">
                    <IconButton
                        color="primary"
                        component="span"
                        sx={{ width: 40, height: 40, marginRight: 1 }}
                    >
                        <CloudUploadIcon />
                    </IconButton>
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    ) : product?.imagePath ? (
                        // Display existing image if available
                        <img
                            src={`https://127.0.0.1:8000${product.imagePath}`}
                            alt="Existing product image"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                        />
                    ) : (
                        <span>Upload Image</span>
                    )}
                </label>
            </Box>

            <Box display="flex" justifyContent="space-between" marginTop={2}>
                <Button variant="outlined" onClick={() => navigate('/admin/enova-products')}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default EnovaProductEdit;
