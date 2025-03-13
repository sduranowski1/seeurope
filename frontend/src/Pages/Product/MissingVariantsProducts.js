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
import {SubcategoryTableBrands} from "./Components/SubcategoryTableBrands";
import Slider from "@mui/material/Slider";
import {WeightRange} from "./Components/WeightRange";
import {jwtDecode} from "jwt-decode";
import AuthContext from "../../AuthContext";
import i18n from "i18next";

export const MissingVariantsProducts = ({lastPart, slug}) => {
    const [displayedItems, setDisplayedItems] = useState([0, 1000000]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [checkboxes, setCheckboxes] = useState({});
    const [userDetails, setUserDetails] = useState([])


    // function findCheckboxes() {
    //     return Object.values(productsData.tableData).flat().reduce((acc, product) => {
    //         if (!acc.hasOwnProperty(product.coupling)) {
    //             acc[product.coupling] = false;
    //         }
    //         return acc;
    //     }, {});
    // }
    //
    // useEffect(() => {
    //     const uniqueCheckboxes = findCheckboxes();
    //     setCheckboxes(uniqueCheckboxes);
    // }, [productsData.tableData]);

    const { t } = useTranslation();

    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [variants, setVariants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
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


    // Debounce timeout variable
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    // Memoize the totalPages calculation to prevent unnecessary re-calculation
    const totalPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit]);

    const fetchAdditionalData = async () => {
        try {
            const [brandsResponse, variantsResponse] = await Promise.all([
                fetch(`https://seequipment.pl/api/brands`),
                fetch('https://seequipment.pl/api/variants'),
                // fetch('https://seequipment.pl/api/categories'),
                // fetch('https://seequipment.pl/api/subcategories'),
            ]);

            if (!brandsResponse.ok || !variantsResponse.ok ) {
                throw new Error('Failed to fetch additional data');
            }

            const brandsData = await brandsResponse.json();
            const variantsData = await variantsResponse.json();

            setBrands(brandsData);
            setVariants(variantsData);
        } catch (error) {
            console.error('Error fetching brands, categories or variants:', error);
            setError('Failed to load brands, categories or variants');
        }
    };

    // Function to fetch product data from both API endpoints
    const fetchProductData = useCallback(async () => {
        setLoading(true); // Set loading true at the start of the request
        try {
            // const response = await fetch('https://seequipment.pl/api/PanelWWW_API/DajTowary?nazwa=Koszt', {
            const response = await fetch(`https://seequipment.pl/api/enova_products/no_pagination?productInfo.brand.name=${lastPart}`, {
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
            console.log(data)

            // Map product data with brand and variant names
            const productsData = data.map((product) => {
                // const dealerDetalPrice = product.listaCen?.find((price) => price.nazwa === 'Dealer Detal');
                // const netto = dealerDetalPrice ? dealerDetalPrice.netto : null;

                const wzrostu = product.features?.find((value) => value.nazwa === '% wzrostu');
                const procWzrostu = wzrostu ? wzrostu.wartosc : null;

                const replacement = product.features?.find((value) => value.nazwa === 'Części zamienne');
                const replacementParts = replacement ? replacement.wartosc : null;

                const capacity = product.features?.find((value) => value.nazwa === 'Capacity');
                const capacityFeat = capacity ? capacity.wartosc : null;

                const weight = product.features?.find((value) => value.nazwa === 'Weight');
                const weightFeat = weight ? weight.wartosc : null;

                // const brandName = brands.find((brand) => brand.id === product.productInfo?.braid)?.name || '';
                const variantName = variants.find((variant) => variant.id === product.productInfo?.varid)?.variantname || '';

                return { ...product, procWzrostu, replacementParts, capacityFeat, weightFeat,  variantName};
            });

            console.log(productsData)

            setProducts(productsData);
            // setTotalItems(data.liczbaWszystkich);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Set loading to false when done
        }
    }, [currentPage, limit, brands, variants, categories, subcategories]);

    // Only fetch brands and variants once on mount
    useEffect(() => {
        fetchAdditionalData();
    }, [lastPart]);

    // Fetch product data after brands and variants are loaded & lastPart of the slug applied here makes the page reload while clicking on variants within navbar
    useEffect(() => {
        if (brands.length > 0 && variants.length > 0) {
            fetchProductData();
        }
    }, [brands, variants, currentPage, limit, lastPart]);

    const handlePageChange = useCallback((page) => {
        if (page >= 1 && page <= totalPages && !loading) {
            setCurrentPage(page);
        }
    }, [totalPages, loading]);

    const handleRowClick = useCallback((productId) => {
        navigate(`/admin/enova_products/${productId}`);
    }, [navigate]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    // Filter products based on weight range
    useEffect(() => {
        const filtered = products.filter((product) => {
            const weight = parseFloat(product.weightFeat?.replace(/[^\d.-]/g, "") || 0);
            return weight >= weightRange[0] && weight <= weightRange[1];
        });
        setFilteredProducts(filtered);
    }, [products, weightRange]);

    // Handle weight range change
    const handleWeightRangeChange = (event, newValue) => {
        setWeightRange(newValue);
    };

    // Find the maximum weight in the filtered products
    const maxWeight = Math.max(
        ...products.map(product => parseFloat(product.weightFeat.replace(/[^\d.-]/g, "")) || 0),
        30000 // Default fallback value for the max weight if no valid products are found
    );

    console.log(maxWeight)

    function findCheckboxes() {
        return Object.values(products).flat().reduce((acc, product) => {
            if (!acc.hasOwnProperty(product.productInfo.brand.name)) {
                acc[product.productInfo.brand.name] = false;
            }
            return acc;
        }, {});
    }

    useEffect(() => {
        const uniqueCheckboxes = findCheckboxes();
        setCheckboxes(uniqueCheckboxes);
    }, [products]);

    console.log(products)

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (token) {
                    // Decode the JWT token to get the email
                    const decodedToken = jwtDecode(token);
                    console.log(decodedToken)
                    const email = decodedToken?.username;

                    if (email) {
                        // setUserEmail(email);
                        // console.log(email)

                        // Fetch additional user details using the email
                        const response = await fetch(
                            `https://seequipment.pl/api/user_enovas?email=${encodeURIComponent(email)}`,
                            {
                                method: 'GET',
                                headers: {
                                    Accept: 'application/json',
                                },
                            }
                        );

                        if (response.ok) {
                            const data = await response.json();
                            setUserDetails(data[0]); // Assuming the API returns an array with the user object
                        } else {
                            console.error('Failed to fetch additional user details:', response.status);
                        }
                    } else {
                        console.error('Email not found in the token');
                    }
                } else {
                    console.error('Token is missing from AuthContext');
                }
            } catch (error) {
                console.error('Error decoding token or fetching user information:', error);
            }
        };

        fetchUserInfo();
    }, [token]);

    console.log(userDetails)

    const fullUrl = window.location.href;
    const parts = fullUrl.split("/"); // Split the string by delimiter

    if (parts.length === 5) {
        // title = products[0]?.categoryName;
        title = products[0]?.productInfo.brand?.name;
        polishTitle = products[0]?.productInfo.brand?.polishName;
        germanTitle = products[0]?.productInfo.brand?.germanName;

        description = products[0]?.productInfo.brand?.description;
        polishDescription = products[0]?.productInfo.brand?.polishDescription;
        germanDescription = products[0]?.productInfo.brand?.germanDescription;
    } else if (parts.length === 6) {
        // title = products[0]?.subcategoryName;
        title = products[0]?.productInfo.variant?.variantname;
        polishTitle = products[0]?.productInfo.variant?.polishSubCatName;
        germanTitle = products[0]?.productInfo.variant?.germanSubCatName;

        description = products[0]?.productInfo.variant?.description;
        polishDescription = products[0]?.productInfo.variant?.polishDescription;
        germanDescription = products[0]?.productInfo.variant?.germanDescription;
    } else {
        title = "my_coupling";
    }

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
                        to={"/my-coupling"}
                    >
                        {t('my_coupling')}
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>{i18n.language === "en"
                        ? title || t("my_coupling")
                        : i18n.language === "de"
                            ? germanTitle || t("my_coupling")
                            : i18n.language === "pl"
                                ? polishTitle || t("my_coupling")
                                : t("my_coupling")}</Typography>
                </Breadcrumbs>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>{i18n.language === "en"
                        ? title || t("my_coupling")
                        : i18n.language === "de"
                            ? germanTitle || t("my_coupling")
                            : i18n.language === "pl"
                                ? polishTitle || t("my_coupling")
                                : t("my_coupling")}</h1>
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
                                            setCheckboxes={(updatedCheckbox) => {
                                                setCheckboxes((prev) => ({ ...prev, [name]: updatedCheckbox }));
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <SubcategoryTableBrands
                        productsData={filteredProducts}
                        onProductClick={handleProductClick}
                        lastPartToCollapse={lastPart}
                        userDetailsPrice={userDetails}
                        title={title}
                    />
                </div>)}
            </section>
        </main>
    );
}