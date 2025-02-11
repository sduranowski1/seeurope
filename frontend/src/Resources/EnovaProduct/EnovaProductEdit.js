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
import 'react-quill/dist/quill.snow.css';
import ListItemIcon from "@mui/material/ListItemIcon"; // Import Quill styles
import ClearIcon from '@mui/icons-material/Clear';
import {Edit} from "react-admin"; // Import Quill styles

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
    const [couplingFilters, setCouplingFilters] = useState([]);
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
                const [brandsResponse, variantsResponse, categoriesResponse, subcategoriesResponse, itemTypesResponse, couplingFiltersResponse] = await Promise.all([
                    fetch('https://se-europe-test.pl/api/brands'),
                    fetch('https://se-europe-test.pl/api/variants'),
                    fetch('https://se-europe-test.pl/api/categories'),
                    fetch('https://se-europe-test.pl/api/subcategories'),
                    fetch('https://se-europe-test.pl/api/item_types'),
                    fetch('https://se-europe-test.pl/api/coupling_filters'),
                ]);
                const brandsData = await brandsResponse.json();
                const variantsData = await variantsResponse.json();
                const categoriesData = await categoriesResponse.json();
                const subcategoriesData = await subcategoriesResponse.json();
                const itemTypesData = await itemTypesResponse.json();
                const couplingFiltersData = await couplingFiltersResponse.json();
                setBrands(brandsData);
                setVariants(variantsData);
                setCategories(categoriesData);
                setSubcategories(subcategoriesData);
                setItemTypes(itemTypesData);
                setCouplingFilters(couplingFiltersData);

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

        if (name === 'brand') {
            setProduct((prevProduct) => ({
                ...prevProduct,
                brand: { id: value },  // If value is 0, set brand to null
            }));
        } else if (name === 'variant') {
            setProduct((prevProduct) => ({
                ...prevProduct,
                variant: { id: value },  // Update the variant by id
            }));
        } else if (name === 'category') {
            setProduct((prevProduct) => ({
                ...prevProduct,
                category: { id: value },  // Update the category by id
            }));
        } else if (name === 'subcategory') {
            setProduct((prevProduct) => ({
                ...prevProduct,
                subcategory: { id: value },  // Update the subcategory by id
            }));
        } else if (name === 'itemType') {
            setProduct((prevProduct) => ({
                ...prevProduct,
                itemType: { id: value },  // Update the itemType by id
            }));
        } else if (name === 'couplingFilter') {
            setProduct((prevProduct) => ({
                ...prevProduct,
                couplingFilter: { id: value },  // Update the itemType by id
            }));
        } else {
            setProduct((prevProduct) => ({
                ...prevProduct,
                [name]: value,  // Update other fields
            }));
        }
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
                ...(product.brand?.id && product.brand.id !== 0 ? { brand: { id: product.brand.id } } : {}),
                // brand: {id: product.brand?.id},
                ...(product.variant?.id && product.variant.id !== 0 ? { variant: { id: product.variant.id } } : {}),
                ...(product.category?.id && product.category.id !== 0 ? { category: { id: product.category.id } } : {}),
                ...(product.subcategory?.id && product.subcategory.id !== 0 ? { subcategory: { id: product.subcategory.id } } : {}),
                ...(product.itemType?.id && product.itemType.id !== 0 ? { itemType: { id: product.itemType.id } } : {}),
                ...(product.couplingFilter?.id && product.couplingFilter.id !== 0 ? { couplingFilter: { id: product.couplingFilter.id } } : {}),
                description: product.description,
                englishTitle: product.englishTitle,
                germanTitle: product.germanTitle,
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

            console.log(updatedProduct)

            if (!productUpdateResponse.ok) {
                throw new Error('Product update failed');
            }

            console.log('Product updated successfully');
            navigate('/admin/enova_products'); // Redirect after successful update
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    {/* Do not remove! The Edit tag is for security */}
    if (loading) {
        return (
            <Edit>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh" // Or use specific height if you want it in a smaller area
                    width="100%"
                >
                    <CircularProgress/>
                </Box>
            </Edit>
        );
    }
    {/* Do not remove! The Edit tag is for security */}


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
                                name="brand"
                                value={product.brand?.id || ''}
                                onChange={handleChange}
                                label="Brand"
                            >
                                <MenuItem value={0}>
                                    <ListItemIcon>
                                        <ClearIcon />
                                    </ListItemIcon>
                                </MenuItem>
                                {brands.map((brand) => (
                                    <MenuItem key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal" disabled={!product.brand?.id}>
                            <InputLabel id="variant-label">Variant</InputLabel>
                            <Select
                                labelId="variant-label"
                                name="variant"
                                value={product.variant?.id || ''}
                                onChange={handleChange}
                                label="Variant"
                            >
                                <MenuItem value={0}>
                                    <ListItemIcon>
                                        <ClearIcon />
                                    </ListItemIcon>
                                </MenuItem>
                                {variants
                                    .filter((variant) => variant.bid === product.brand?.id) // Filter variants by selected brand ID
                                    .map((variant) => (
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
                                name="category"
                                value={product.category?.id || ''}
                                onChange={handleChange}
                                label="Category"
                            >
                                <MenuItem value={0}>
                                    <ListItemIcon>
                                        <ClearIcon />
                                    </ListItemIcon>
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal"  disabled={!product.category?.id}>
                            <InputLabel id="subcategory-label">Subcategory</InputLabel>
                            <Select
                                labelId="subcategory-label"
                                name="subcategory"
                                value={product.subcategory?.id || ''}
                                onChange={handleChange}
                                label="Subcategory"
                            >
                                <MenuItem value={0}>
                                    <ListItemIcon>
                                        <ClearIcon />
                                    </ListItemIcon>
                                </MenuItem>
                                {subcategories
                                    .filter((subcategory) => subcategory.cid === product.category?.id) // Filter variants by selected brand ID
                                    .map((subcategory) => (
                                    <MenuItem key={subcategory.id} value={subcategory.id}>
                                        {subcategory.subCatName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal"  disabled={!product.subcategory?.id}>
                            <InputLabel id="itemType-label">Item Type</InputLabel>
                            <Select
                                labelId="itemType-label"
                                name="itemType"
                                value={product.itemType?.id || ''}
                                onChange={handleChange}
                                label="Item Type"
                            >
                                <MenuItem value={0}>
                                    <ListItemIcon>
                                        <ClearIcon />
                                    </ListItemIcon>
                                </MenuItem>
                                {itemTypes
                                    .filter((itemType) => itemType.scid === product.subcategory?.id) // Filter variants by selected brand ID
                                    .map((itemType) => (
                                    <MenuItem key={itemType.id} value={itemType.id}>
                                        {itemType.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="couplingFilter-label">Coupling Filter</InputLabel>
                            <Select
                                labelId="couplingFilter-label"
                                name="couplingFilter"
                                value={product.couplingFilter?.id || ''}
                                onChange={handleChange}
                                label="Item Type"
                            >
                                <MenuItem value={0}>
                                    <ListItemIcon>
                                        <ClearIcon />
                                    </ListItemIcon>
                                </MenuItem>
                                {couplingFilters.map((couplingFilter) => (
                                        <MenuItem key={couplingFilter.id} value={couplingFilter.id}>
                                            {couplingFilter.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>

                        <Typography variant="h5" component="h5" sx={{ marginTop: "20px" }}>English Title</Typography>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                id="englishTitle"
                                value={product?.englishTitle || ''}
                                onChange={(event) => handleChange({ target: { name: 'englishTitle', value: event.target.value } })}
                                placeholder="Enter the English title"
                            />
                        </FormControl>

                        <Typography variant="h5" component="h5" sx={{ marginTop: "20px" }}>German Title</Typography>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                id="germanTitle"
                                value={product?.germanTitle || ''}
                                onChange={(event) => handleChange({ target: { name: 'germanTitle', value: event.target.value } })}
                                placeholder="Enter the German title"
                            />
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
                            <Button variant="outlined" onClick={() => navigate('/admin/enova_products')}>
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
