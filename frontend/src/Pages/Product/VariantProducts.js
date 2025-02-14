import '../ThreePoint/ThreePoint.scss';
import {BoxWithCheckboxes} from "../../Components/BoxWithCheckboxes/BoxWithCheckboxes";
import {ProductRangeComponent} from "./Components/ProductRangeComponent";
import {TableWithTabs} from "../../Components/TableWithTabs/TableWithTabs";
import {useState, useEffect, useMemo, useCallback, useContext} from "react";
import { useTranslation } from 'react-i18next';
import {Link, useNavigate, useParams} from "react-router-dom";
import {fetchToken} from "../../utils/fetchToken";
import {ProductDescription} from "./Components/ProductDescription";
import Box from "@mui/material/Box";
import {Breadcrumbs, CircularProgress, Typography} from "@mui/material";
import * as React from "react";
import {SubcategoryTableBrands} from "./Components/SubcategoryTableBrands";
import {WeightRange} from "./Components/WeightRange";
import {SubcategoryTable} from "./Components/SubcategoryTable";
import {jwtDecode} from "jwt-decode";
import AuthContext from "../../AuthContext";

const productsData = {
    name: '3 POINT',
    description: 'We deliver and stock equipment for tractors.',
    couplings: [],
    tableData: {
        adapter: [
            {
                artNo: 100838,
                coupling: '3 punkt',
                width: 1134,
                height: 781,
                capacity: 2500,
                machineSide: '3punkt',
                equipmentSide: 'SMS/Euro',
                weight: 87
            },
            {
                artNo: 100839,
                coupling: '3 punkt',
                width: 1165,
                height: 850,
                capacity: 5000,
                machineSide: '3punkt',
                equipmentSide: 'Stora BM',
                weight: 121
            },
            {
                artNo: 113542,
                coupling: 'Big BM / 3 punkt',
                width: 1184,
                height: 492,
                capacity: 2500,
                machineSide: 'Big BM/3 punkt',
                equipmentSide: 'SMS/Euro',
                weight: 134
            }
        ],
        stengrep: [
            {
                artNo: 113224,
                coupling: '3 punkt',
                width: 2000,
                height: 600,
                depth: 1000,
                horn: 35,
                bump: 'JA',
                weight: 335
            },
        ]
    }
};

export const VariantProducts = ({lastPart, slug}) => {
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


    // Debounce timeout variable
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    // Memoize the totalPages calculation to prevent unnecessary re-calculation
    const totalPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit]);

    const fetchAdditionalData = async () => {
        try {
            const [brandsResponse, variantsResponse, categoriesResponse, subcategoriesResponse] = await Promise.all([
                fetch('https://se-europe-test.pl/api/brands'),
                fetch('https://se-europe-test.pl/api/variants'),
                fetch('https://se-europe-test.pl/api/categories'),
                fetch('https://se-europe-test.pl/api/subcategories'),
            ]);

            if (!brandsResponse.ok || !variantsResponse.ok || !categoriesResponse.ok ) {
                throw new Error('Failed to fetch additional data');
            }

            const brandsData = await brandsResponse.json();
            const variantsData = await variantsResponse.json();
            const categoriesData = await categoriesResponse.json();
            const subcategoriesData = await subcategoriesResponse.json();

            setBrands(brandsData);
            setVariants(variantsData);
            setCategories(categoriesData);
            setSubcategories(subcategoriesData);
        } catch (error) {
            console.error('Error fetching brands, categories or variants:', error);
            setError('Failed to load brands, categories or variants');
        }
    };

    // Function to fetch product data from both API endpoints
    const fetchProductData = useCallback(async () => {
        setLoading(true); // Set loading true at the start of the request
        try {
            // const token = await fetchToken();
            // setToken(token);

            const response = await fetch(`https://se-europe-test.pl/api/enova_products/no_pagination?productInfo.variant.variantname=${lastPart}`, {
            // const response = await fetch('https://se-europe-test.pl/api/PanelWWW_API/DajTowary?nazwa=Koszt', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                // body: JSON.stringify({
                //     strona: currentPage,
                //     limit: limit,
                //     pokazCeny: true,
                //     poleSortowane: "ID",
                //     czyRosnaco: 1,
                // }),
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

                const wzrostu = product.features.find((value) => value.nazwa === '% wzrostu');
                const procWzrostu = wzrostu ? wzrostu.wartosc : null;

                const replacement = product.features.find((value) => value.nazwa === 'Części zamienne');
                const replacementParts = replacement ? replacement.wartosc : null;

                const capacity = product.features.find((value) => value.nazwa === 'Capacity');
                const capacityFeat = capacity ? capacity.wartosc : null;

                const weight = product.features?.find((value) => value.nazwa === 'Weight');
                const weightFeat = weight ? weight.wartosc : null;

                const brandName = brands.find((brand) => brand.id === product.productInfo?.braid)?.name || '';
                const variantName = variants.find((variant) => variant.id === product.productInfo?.varid)?.variantname || '';
                const categoryName = categories.find((category) => category.id === product.productInfo?.catid)?.name || '';
                const subcategoryName = subcategories.find((subcategory) => subcategory.id === product.productInfo?.scatid)?.subCatName || '';

                return { ...product, procWzrostu, replacementParts, capacityFeat, weightFeat, brandName, variantName, categoryName, subcategoryName };
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

    // Only fetch brands and variants once on mount & lastPart refetches the data in the product table
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

    console.log(maxWeight)
    console.log(filteredProducts)

    function findCheckboxes() {
        return Object.values(filteredProducts).flat().reduce((acc, product) => {
            if (!acc.hasOwnProperty(product.productInfo.variant.variantname)) {
                acc[product.productInfo.variant.variantname] = false;
            }
            return acc;
        }, {});
    }

    useEffect(() => {
        const uniqueCheckboxes = findCheckboxes();
        setCheckboxes(uniqueCheckboxes);
    }, [filteredProducts]);

    // Keep the domain and the first part of the slug
    const fullUrl = window.location.href;

    const parts = fullUrl.split("/"); // Split the string by delimiter

    // Keep the domain and the first part of the slug
    const brandsSlug = parts[4]; // First part of the slug

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
                            `https://se-europe-test.pl/api/user_enovas?email=${encodeURIComponent(email)}`,
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
                        My Coupling
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        to={`/my-coupling/${brandsSlug}`}
                    >
                        {brandsSlug}
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>{lastPart ? lastPart : t("my_coupling")}</Typography>
                </Breadcrumbs>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>{lastPart ? lastPart : t("my_coupling")}</h1>
                    <p className={'paragraph paragraph--medium'}>{t("tractor_equipment")}</p>
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
                                        setCheckboxes={(checkboxValue) => setCheckboxes(checkboxValue)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/*<SubcategoryTable productsData={productsData} displayedItems={displayedItems}/>*/}
                {/*<SubcategoryTable productsData={productsData} displayedItems={displayedItems} checkboxes={checkboxes}/>*/}
                <SubcategoryTableBrands
                    productsData={filteredProducts}
                    onProductClick={handleProductClick}
                    lastPartToCollapse={lastPart}
                    userDetailsPrice={userDetails}

                />
                {/*{selectedProduct && (*/}
                {/*    <ProductDescription product={selectedProduct} productsData={filteredProducts}/>*/}
                {/*)}*/}
                </div>)}
            </section>
        </main>
    );
}