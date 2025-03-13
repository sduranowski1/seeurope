import '../ThreePoint/ThreePoint.scss';
import {BoxWithCheckboxes} from "../../Components/BoxWithCheckboxes/BoxWithCheckboxes";
import {ProductRangeComponent} from "./Components/ProductRangeComponent";
import {TableWithTabs} from "../../Components/TableWithTabs/TableWithTabs";
import {useState, useEffect, useMemo, useCallback, useContext} from "react";
import { useTranslation } from 'react-i18next';
import {Link, useNavigate, useParams} from "react-router-dom";
import {fetchToken} from "../../utils/fetchToken";
import {SubcategoryTable} from "./Components/SubcategoryTable";
import {ProductDescription} from "./Components/ProductDescription";
import Box from "@mui/material/Box";
import {Breadcrumbs, CircularProgress, Typography} from "@mui/material";
import * as React from "react";
import {WeightRange} from "./Components/WeightRange";
import {jwtDecode} from "jwt-decode";
import AuthContext from "../../AuthContext";
import useUserDetails from "./useUserDetails";
import i18n from "i18next";

export const SubcategoryProducts = ({lastPart, slug}) => {
    const [displayedItems, setDisplayedItems] = useState([0, 1000000]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [checkboxes, setCheckboxes] = useState({});
    // const [userDetails, setUserDetails] = useState([])
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [variants, setVariants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    // const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit, setLimit] = useState(10); // Number of items per page
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [weightRange, setWeightRange] = useState([0, 30000]);
    const {id} = useParams(); // Get the product ID from the URL
    const { token } = useContext(AuthContext); // Get token from AuthContext
    let [title, setTitle] = useState("");
    let [germanTitle, setGermanTitle] = useState("");
    let [polishTitle, setPolishTitle] = useState("");
    let [description, setDescripiton] = useState("");
    let [polishDescription, setPolishDescripiton] = useState("");
    let [germanDescription, setGErmanDescripiton] = useState("");
    // Memoize the totalPages calculation to prevent unnecessary re-calculation
    const totalPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit]);

    const fetchAdditionalData = async () => {
        try {
            const [brandsResponse, variantsResponse, categoriesResponse, subcategoriesResponse, itemTypesResponse] = await Promise.all([
                fetch('https://seequipment.pl/api/brands'),
                fetch('https://seequipment.pl/api/variants'),
                fetch('https://seequipment.pl/api/categories'),
                fetch('https://seequipment.pl/api/subcategories'),
                fetch('https://seequipment.pl/api/item_types'),
            ]);

            if (!brandsResponse.ok || !variantsResponse.ok || !categoriesResponse.ok ) {
                throw new Error('Failed to fetch additional data');
            }

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
        } catch (error) {
            console.error('Error fetching brands, categories or variants:', error);
            setError('Failed to load brands, categories or variants');
        }
    };

    // Function to fetch product data from both API endpoints
    const fetchProductData = useCallback(async () => {
        setLoading(true); // Set loading true at the start of the request
        try {
            // Derive parts from URL path
            const urlPath = window.location.pathname;
            const parts = urlPath.split('/').filter(part => part !== '');
            const lastPart = parts[parts.length - 1];  // Last part of the URL path
            const secondPart = parts[parts.length - 2]; // Second to last part of the URL path
            const thirdPart = parts[parts.length - 3]; // Third to last part of the URL path
            console.log('URL parts:', parts);
            console.log('Last part:', lastPart);
            console.log('Second part:', secondPart);
            console.log('Third part:', thirdPart);
            // const token = await fetchToken();
            // setToken(token);
            let apiUrl;

            if (parts.length === 2) {
                apiUrl = `https://seequipment.pl/api/enova_products/no_pagination?productInfo.category.name=${lastPart}`;
            } else if (parts.length === 3) {
                apiUrl = `https://seequipment.pl/api/enova_products/no_pagination?productInfo.category.name=${secondPart}&productInfo.subcategory.subCatName=${lastPart}`;
            } else if (parts.length === 4) {
                apiUrl = `https://seequipment.pl/api/enova_products/no_pagination?productInfo.category.name=${thirdPart}&productInfo.subcategory.subCatName=${secondPart}&productInfo.itemType.name=${lastPart}`;
            } else {
                throw new Error("Unsupported URL structure");
            }

            console.log(apiUrl)

            // const response = await fetch(`https://seequipment.pl/api/enova_products?productInfo.subcategory.subCatName=${lastPart}`, {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error in product request: ${response.statusText}`);
            }

            const data = await response.json();

            // Map product data with brand and variant names
            const productsData = data.map((product) => {

                const wzrostu = product.features.find((value) => value.nazwa === '% wzrostu');
                const procWzrostu = wzrostu ? wzrostu.wartosc : null;

                const replacement = product.features.find((value) => value.nazwa === 'Części zamienne');
                const replacementParts = replacement ? replacement.wartosc : null;

                const capacity = product.features.find((value) => value.nazwa === 'Capacity');
                const capacityFeat = capacity ? capacity.wartosc : null;


                const weight = product.features?.find((value) => value.nazwa === 'Weight');
                const weightFeat = weight ? weight.wartosc : null;

                return { ...product, procWzrostu, replacementParts, capacityFeat, weightFeat};
            });
            console.log("hi:", data)

            console.log(productsData)

            setProducts(productsData);
            // setTotalItems(data.liczbaWszystkich);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Set loading to false when done
        }
    }, [currentPage, limit, brands, variants, categories, subcategories, itemTypes]);

    useEffect(() => {
        fetchAdditionalData();
    }, []); // Only fetch brands and variants once on mount

    useEffect(() => {
        if (brands.length > 0 && variants.length > 0) {
            fetchProductData();
        }
    }, [brands, variants, currentPage, limit]); // Fetch product data after brands and variants are loaded

    const handlePageChange = useCallback((page) => {
        if (page >= 1 && page <= totalPages && !loading) {
            setCurrentPage(page);
        }
    }, [totalPages, loading]);

    const handleRowClick = useCallback((productId) => {
        navigate(`/admin/enova_products/${productId}`);
    }, [navigate]);

    useEffect(() => {
        const filtered = products.filter((product) => {
            // const capacity = parseFloat(product.capacityFeat?.replace(/[^\d.-]/g, "") || 0);
            // return capacity >= weightRange[0] && capacity <= weightRange[1];
            const weight = parseFloat(product.weightFeat?.replace(/[^\d.-]/g, "") || 0);
            return weight >= weightRange[0] && weight <= weightRange[1];
        });
        setFilteredProducts(filtered);
    }, [products, weightRange]);


    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    // Handle weight range change
    const handleWeightRangeChange = (event, newValue) => {
        setWeightRange(newValue);
    };

    // Find the maximum weight in the filtered products
    const maxWeight = Math.max(
        ...filteredProducts.map(product => parseFloat(product.capacityFeat.replace(/[^\d.-]/g, "")) || 0),
        30000 // Default fallback value for the max weight if no valid products are found
    );

    function findCheckboxes() {
        return Object.values(filteredProducts).flat().reduce((acc, product) => {
            if (!acc.hasOwnProperty(product?.productInfo?.brand?.name)) {
                acc[product?.productInfo?.brand?.name] = false;
            }
            return acc;
        }, {});
    }

    useEffect(() => {
        const uniqueCheckboxes = findCheckboxes();
        setCheckboxes(uniqueCheckboxes);
    }, [filteredProducts]);

    const fullUrl = window.location.href;

    const parts = fullUrl.split("/"); // Split the string by delimiter

    // Get all parts from index 4, excluding the last part
    const categoriesSlug = parts[4]; // First part of the slug
    const subcategoriesSlug = parts.slice(5, -1).join("/");

    console.log(parts.length)
    console.log("categories slug:", categoriesSlug); // Outputs the desired middle part of the URL
    console.log(filteredProducts)
    console.log(categories)
    console.log(products)

    const filteredCategoriesTitle = categories.filter(category => category.name === lastPart);
    // console.log(filteredCategoriesTitle[0]);

    const filteredSubcategoriesTitle = subcategories.filter(subcategory => subcategory.subCatName === lastPart);
    // console.log(filteredSubcategoriesTitle[0].subCatName);

    const filteredItemTypeTitle = itemTypes.filter(itemType => itemType.name === lastPart);
    // console.log(filteredItemTypeTitle[0].name);

    const breadCrumbCategory = products[0]?.productInfo.category?.name;
    const polishBreadCrumbCategory = products[0]?.productInfo.category?.polishName;
    const germanBreadCrumbCategory = products[0]?.productInfo.category?.germanName;

    const breadCrumbSubcategory = products[0]?.productInfo.subcategory?.subCatName;
    const polishBreadCrumbSubcategory = products[0]?.productInfo.subcategory?.polishSubCatName;
    const germanBreadCrumbSubcategory = products[0]?.productInfo.subcategory?.germanSubCatName;
    const breadCrumbItemType = products[0]?.productInfo.itemType?.name;

    if (parts.length === 5) {
        // title = products[0]?.categoryName;
        title = products[0]?.productInfo.category?.name;
        polishTitle = products[0]?.productInfo.category?.polishName;
        germanTitle = products[0]?.productInfo.category?.germanName;

        description = products[0]?.productInfo.category?.description;
        polishDescription = products[0]?.productInfo.category?.polishDescription;
        germanDescription = products[0]?.productInfo.category?.germanDescription;
    } else if (parts.length === 6) {
        // title = products[0]?.subcategoryName;
        title = products[0]?.productInfo.subcategory?.subCatName;
        polishTitle = products[0]?.productInfo.subcategory?.polishSubCatName;
        germanTitle = products[0]?.productInfo.subcategory?.germanSubCatName;

        description = products[0]?.productInfo.subcategory?.description;
        polishDescription = products[0]?.productInfo.subcategory?.polishDescription;
        germanDescription = products[0]?.productInfo.subcategory?.germanDescription;
    } else if (parts.length === 7) {
        // title = products[0]?.itemTypeName;
        title = products[0]?.productInfo.itemType?.name;
        polishTitle = products[0]?.productInfo.itemType?.polishName;
        germanTitle = products[0]?.productInfo.itemType?.germanName;

        description = products[0]?.productInfo.itemType?.description;
        polishDescription = products[0]?.productInfo.itemType?.polishDescription;
        germanDescription = products[0]?.productInfo.itemType?.germanDescription;
    } else {
        title = "my_machine";
    }

    const userDetails = useUserDetails(token);

    const formatString = (str) => {
        return str
            .split('_') // Split by underscore
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(' '); // Join with spaces
    };

    const formattedLastPart = formatString(lastPart);

    return (
        <main>
            <section className={'section-contrains tables-page'}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to={"/"}>
                        Start
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        to={"/my-machine"}
                    >
                        {t('my_machine')}
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        to={`/my-machine/${categoriesSlug}`}
                    >
                        {/*{breadCrumbCategory ? breadCrumbCategory : categoriesSlug}*/}
                        {i18n.language === "en"
                            ? breadCrumbCategory || categoriesSlug
                            : i18n.language === "de"
                                ? germanBreadCrumbCategory || categoriesSlug
                                : i18n.language === "pl"
                                    ? polishBreadCrumbCategory || categoriesSlug
                                    : t("my_machine")}
                    </Link>
                    {subcategoriesSlug && (
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/my-machine/${categoriesSlug}/${subcategoriesSlug}`}
                        >
                            {/*{breadCrumbSubcategory ? breadCrumbSubcategory : subcategoriesSlug}*/}
                            {i18n.language === "en"
                                ? breadCrumbSubcategory || subcategoriesSlug
                                : i18n.language === "de"
                                    ? germanBreadCrumbSubcategory || subcategoriesSlug
                                    : i18n.language === "pl"
                                        ? polishBreadCrumbSubcategory || subcategoriesSlug
                                        : t("my_machine")}
                        </Link>
                    )}
                    <Typography sx={{ color: 'text.primary' }}>{i18n.language === "en"
                        ? title || t("my_machine")
                        : i18n.language === "de"
                            ? germanTitle || t("my_machine")
                            : i18n.language === "pl"
                                ? polishTitle || t("my_machine")
                                : t("my_machine")}</Typography>
                </Breadcrumbs>
                <div className={'heading-container'}>
                    {/*<h1 className={'page-title'}>{lastPart ? lastPart : t("my_machine")}</h1>*/}
                    <h1 className={'page-title'}>{i18n.language === "en"
                        ? title || t("my_machine")
                        : i18n.language === "de"
                            ? germanTitle || t("my_machine")
                            : i18n.language === "pl"
                                ? polishTitle || t("my_machine")
                                : t("my_machine")}</h1>
                    {/*<h1 className={'page-title'}>{lastPart ? lastPart : t("my_machine")}</h1>*/}
                    <p className={'paragraph paragraph--medium'}>{i18n.language === "en"
                        ? description || t("tractor_equipment")
                        : i18n.language === "de"
                            ? germanDescription || t("tractor_equipment")
                            : i18n.language === "pl"
                                ? polishDescription || t("tractor_equipment")
                                : t("tractor_equipment")}</p>

                </div>
                {loading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="25vh" // Adjust height to suit your layout
                        width="100%"
                    >
                        <CircularProgress />
                    </Box>
                ) : (<div>
                <div className={'available-choices-container'}>

                    <div className={'choice-container'}>
                        <h2>{t("machine_weight")}</h2>
                        {/*<ProductRangeComponent/>*/}
                        <WeightRange
                            weightRange={weightRange}
                            maxWeight={maxWeight}
                            onChange={handleWeightRangeChange}
                        />
                    </div>
                    <div className={'choice-container'}>
                        <h2>{t("coupling")}</h2>
                        <div className={'choice-container__checkboxes'}>
                            {checkboxes && Object.keys(checkboxes).map((name, i) => {
                                return (
                                    <BoxWithCheckboxes
                                        key={i}
                                        label={name}
                                        checkboxes={checkboxes}
                                        setCheckboxes={(checkboxValue) => setCheckboxes(checkboxValue)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/*<SubcategoryTable productsData={productsData} displayedItems={displayedItems}/>*/}
                {/*<SubcategoryTable productsData={productsData} displayedItems={displayedItems} checkboxes={checkboxes}/>*/}
                <SubcategoryTable
                    productsData={filteredProducts}
                    onProductClick={handleProductClick}
                    lastPartToCollapse={lastPart}
                    userDetailsPrice={userDetails}
                />
                {/*{selectedProduct && (*/}
                {/*    <ProductDescription product={selectedProduct} productsData={filteredProducts}/>*/}
                {/*)}*/}
                </div>
                )}
            </section>
        </main>
    );
}