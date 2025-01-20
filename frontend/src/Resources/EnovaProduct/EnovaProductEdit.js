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
import EnovaProductById from "./EnovaProductById";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const EnovaProductEdit = () => {
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
    const [token, setToken] = useState(null);
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
                const response = await fetch(`https://se-europe-test.pl/api/product_infos/${id}`);
                const productData = await response.json();
                setProduct(productData);

                // Fetch brands and variants data
                const [brandsResponse, variantsResponse, categoriesResponse, subcategoriesResponse, itemTypesResponse] = await Promise.all([
                    fetch('https://se-europe-test.pl/api/brands'),
                    fetch('https://se-europe-test.pl/api/variants'),
                    fetch('https://se-europe-test.pl/api/categories'),
                    fetch('https://se-europe-test.pl/api/subcategories'),
                    fetch('https://se-europe-test.pl/api/item_types')
                ]);
                const brandsData = await brandsResponse.json();
                const variantsData = await variantsResponse.json();
                const categoriesData = await categoriesResponse.json();
                const subcategoriesData = await subcategoriesResponse.json();
                const itemTypesData = await itemTypesResponse.json();
                setBrands(brandsData);
                setVariants(variantsData);
                setCategories(categoriesData);
                setSubcategories(subcategoriesData);
                setItemTypes(itemTypesData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    const handleChange = (event) => {
        setProduct({...product, [event.target.name]: event.target.value});
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
            let imageId = product?.imagePath; // Default to the existing image path

            // Only upload if a new image is selected
            if (image) {
                const formData = new FormData();
                formData.append('file', image);

                const imageUploadResponse = await fetch('https://se-europe-test.pl/api/products_media_objects', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData,
                });

                if (!imageUploadResponse.ok) {
                    throw new Error('Image upload failed');
                }

                const result = await imageUploadResponse.json();
                imageId = result.contentUrl; // Use the new image's URL or ID
            }

            // Prepare the updated product data
            const updatedProduct = {
                braid: product.braid,
                varid: product.varid,
                catid: product.catid,
                scatid: product.scatid,
                itypeid: product.itypeid,
                description: product.description,
                polishDescription: product.polishDescription,
                germanDescription: product.germanDescription,
                imagePath: imageId, // Use the existing or updated image path
            };

            // Send the PUT request
            const productUpdateResponse = await fetch(`https://se-europe-test.pl/api/product_infos/${id}`, {
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
            navigate('/admin/enova-products'); // Redirect after successful update
        } catch (error) {
            console.error('Error saving product:', error);
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
                    <EnovaProductById /> {/* Assuming this component renders your table */}
                </Box>

                {/* Sticky Section */}
                <Box sx={{flex: 1, maxWidth: 600, position: 'sticky', top: 16}}>
                    <Box component="form" sx={{maxWidth: '100%'}}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="brand-label">Brand</InputLabel>
                            <Select
                                labelId="brand-label"
                                name="braid"
                                value={product?.braid || ''}
                                onChange={handleChange}
                                label="Brand"
                            >
                                <MenuItem value={0}>
                                    <em></em>
                                </MenuItem>
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
                                <MenuItem value={0}>
                                    <em></em>
                                </MenuItem>
                                {variants.map((variant) => (
                                    <MenuItem key={variant.id} value={variant.id}>
                                        {variant.variantname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                name="catid"
                                value={product?.catid || ''}
                                onChange={handleChange}
                                label="Category"
                            >
                                <MenuItem value={0}>
                                    <em></em>
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="subcategory-label">Subcategory</InputLabel>
                            <Select
                                labelId="subcategory-label"
                                name="scatid"
                                value={product?.scatid || ''}
                                onChange={handleChange}
                                label="Subcategory"
                            >
                                <MenuItem value={0}>
                                    <em></em>
                                </MenuItem>
                                {subcategories.map((subcategory) => (
                                    <MenuItem key={subcategory.id} value={subcategory.id}>
                                        {subcategory.subCatName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="itemType-label">Item Type</InputLabel>
                            <Select
                                labelId="itemType-label"
                                name="itypeid"
                                value={product?.itypeid || ''}
                                onChange={handleChange}
                                label="Item Type"
                            >
                                <MenuItem value={0}>
                                    <em></em>
                                </MenuItem>
                                {itemTypes.map((itemType) => (
                                    <MenuItem key={itemType.id} value={itemType.id}>
                                        {itemType.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                        <Typography variant="h5" component="h5" sx={{marginTop: "20px"}}>English</Typography>
                        <FormControl fullWidth margin="normal">
                            <ReactQuill
                                theme="snow"
                                value={product?.description || ''}
                                onChange={(value) => handleChange({ target: { name: 'description', value } })}
                                placeholder="Enter the product description"
                            />
                        </FormControl>

                        <Typography variant="h5" component="h5" sx={{marginTop: "20px"}}>Polski</Typography>
                        <FormControl fullWidth margin="normal">
                            <ReactQuill
                                theme="snow"
                                value={product?.polishDescription || ''}
                                onChange={(value) => handleChange({ target: { name: 'polishDescription', value } })}
                                placeholder="Enter the product description in polish"
                            />
                        </FormControl>

                        <Typography variant="h5" component="h5" sx={{marginTop: "20px"}}>Deutsch</Typography>
                        <FormControl fullWidth margin="normal">
                            <ReactQuill
                                theme="snow"
                                value={product?.germanDescription || ''}
                                onChange={(value) => handleChange({ target: { name: 'germanDescription', value } })}
                                placeholder="Enter the product description in german"
                            />
                        </FormControl>

                        {/* Image Upload */}
                        <Box marginTop={2}>
                            <input
                                accept="image/*"
                                id="upload-image"
                                type="file"
                                onChange={handleFileChange}
                                style={{display: 'none'}}
                            />
                            <label htmlFor="upload-image">
                                <IconButton
                                    color="primary"
                                    component="span"
                                    sx={{width: 40, height: 40, marginRight: 1}}
                                >
                                    <CloudUploadIcon/>
                                </IconButton>
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{maxWidth: '100%', maxHeight: '200px'}}
                                    />
                                ) : product?.imagePath ? (
                                    <img
                                        src={`https://se-europe-test.pl${product.imagePath}`}
                                        alt="Existing product image"
                                        style={{maxWidth: '100%', maxHeight: '200px', borderRadius: '15px'}}
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
                </Box>

            </Box>
        </div>
    );
};
export default EnovaProductEdit;
