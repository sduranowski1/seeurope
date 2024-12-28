import '../ThreePoint/ThreePoint.scss';
import {BoxWithCheckboxes} from "../../Components/BoxWithCheckboxes/BoxWithCheckboxes";
import {ProductRangeComponent} from "./Components/ProductRangeComponent";
import {TableWithTabs} from "../../Components/TableWithTabs/TableWithTabs";
import {useState, useEffect, useMemo, useCallback} from "react";
import { useTranslation } from 'react-i18next';
import {Link, useNavigate} from "react-router-dom";
import {fetchToken} from "../../utils/fetchToken";
import {SubcategoryTable} from "./Components/SubcategoryTable";
import {ProductDescription} from "./Components/ProductDescription";
import Box from "@mui/material/Box";
import {Breadcrumbs, CircularProgress, Typography} from "@mui/material";
import * as React from "react";
import {WeightRange} from "./Components/WeightRange";

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

export const SubcategoryProducts = ({lastPart, slug}) => {
    const [displayedItems, setDisplayedItems] = useState([0, 1000000]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [checkboxes, setCheckboxes] = useState({});

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
    const [itemTypes, setItemTypes] = useState([]);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit, setLimit] = useState(10); // Number of items per page
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [weightRange, setWeightRange] = useState([0, 30000]);


    // Debounce timeout variable
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    // Memoize the totalPages calculation to prevent unnecessary re-calculation
    const totalPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit]);

    const fetchAdditionalData = async () => {
        try {
            const [brandsResponse, variantsResponse, categoriesResponse, subcategoriesResponse, itemTypesResponse] = await Promise.all([
                fetch('https://se-europe-test.pl/api/brands'),
                fetch('https://se-europe-test.pl/api/variants'),
                fetch('https://se-europe-test.pl/api/categories'),
                fetch('https://se-europe-test.pl/api/subcategories'),
                fetch('https://se-europe-test.pl/api/item_types'),
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
            // const lastPart = parts[parts.length - 1];
            console.log('URL parts:', parts);
            console.log('Last part:', lastPart);
            // const token = await fetchToken();
            // setToken(token);
            let apiUrl;

            if (parts.length === 2) {
                apiUrl = `https://se-europe-test.pl/api/enova_products?productInfo.category.name=${lastPart}`;
            } else if (parts.length === 3) {
                apiUrl = `https://se-europe-test.pl/api/enova_products?productInfo.subcategory.subCatName=${lastPart}`;
            } else if (parts.length === 4) {
                apiUrl = `https://se-europe-test.pl/api/enova_products?productInfo.itemType.name=${lastPart}`;
            } else {
                throw new Error("Unsupported URL structure");
            }

            console.log(apiUrl)

            // const response = await fetch(`https://se-europe-test.pl/api/enova_products?productInfo.subcategory.subCatName=${lastPart}`, {
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
            // const productsData = data.elementy.map((product) => {
            const productsData = data.map((product) => {
                // const dealerDetalPrice = product.listaCen.find((price) => price.nazwa === 'Dealer Detal');
                // const netto = dealerDetalPrice ? dealerDetalPrice.netto : null;

                const wzrostu = product.features.find((value) => value.nazwa === '% wzrostu');
                const procWzrostu = wzrostu ? wzrostu.wartosc : null;

                const replacement = product.features.find((value) => value.nazwa === 'Części zamienne');
                const replacementParts = replacement ? replacement.wartosc : null;

                const capacity = product.features.find((value) => value.nazwa === 'Capacity');
                const capacityFeat = capacity ? capacity.wartosc : null;

                const brandName = brands.find((brand) => brand.id === product.productInfo?.braid)?.name || 'Other';
                const variantName = variants.find((variant) => variant.id === product.productInfo?.varid)?.variantname || '';
                const categoryName = categories.find((category) => category.id === product.productInfo?.catid)?.name || '';
                const subcategoryName = subcategories.find((subcategory) => subcategory.id === product.productInfo?.scatid)?.subCatName || '';
                const itemTypeName = itemTypes.find((itemType) => itemType.id === product.productInfo?.itypeid)?.name || '';

                return { ...product, procWzrostu, replacementParts, capacityFeat,  brandName, variantName, categoryName, subcategoryName, itemTypeName };
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
        navigate(`/admin/enova-products/${productId}`);
    }, [navigate]);

    useEffect(() => {
        // Get the full URL of the current page
        const fullUrl = window.location.href;
        console.log("Full URL:", fullUrl); // Log the full URL

        // Extract the slug (the part of the URL after the domain)
        const slug = fullUrl.split(window.location.origin)[1];
        console.log("Extracted Slug:", slug);

        // Split the slug into parts
        const slugParts = slug.split("/").filter(Boolean); // Remove empty parts (e.g., trailing slashes)
        console.log("slugParts:", slugParts);

        // Normalize the parts of the slug
        const normalizedLastPart = slugParts.at(-1)?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const normalizedSecondLastPart = slugParts.length > 1
            ? slugParts.at(-2)?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
            : undefined;

        console.log("normalizedLastPart:", normalizedLastPart);
        console.log("normalizedSecondLastPart:", normalizedSecondLastPart);

        const filtered = products.filter((product) => {
            const normalizedSubcategory = product.subcategoryName
                ?.replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase();
            const normalizedCategory = product.categoryName
                ?.replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase();
            const normalizedItemType = product.itemTypeName // Assuming `itemTypeName` exists in the product
                ?.replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase();

            console.log("normalizedSubcategory:", normalizedSubcategory);
            console.log("normalizedCategory:", normalizedCategory);
            console.log("normalizedItemType:", normalizedItemType);

            const weightString = product.capacityFeat; // Example: "2500kg"
            const weight = parseFloat(weightString.replace(/[^\d.-]/g, ""));

            if (slugParts.length < 4) {
                return normalizedSubcategory === normalizedLastPart &&
                    weight >= weightRange[0] &&
                    weight <= weightRange[1];
            } else if (slugParts.length === 4) {
                // When the link has 4 parts, swap subcategory with item type
                return normalizedItemType === normalizedLastPart &&
                    weight >= weightRange[0] &&
                    weight <= weightRange[1];
            } else {
                // Default behavior for other lengths
                return normalizedSubcategory === normalizedLastPart &&
                    weight >= weightRange[0] &&
                    weight <= weightRange[1];
            }
        });

        setFilteredProducts(filtered);
        console.log("oh:", filtered)
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
    console.log(products)

    function findCheckboxes() {
        return Object.values(filteredProducts).flat().reduce((acc, product) => {
            if (!acc.hasOwnProperty(product.brandName)) {
                acc[product.brandName] = false;
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

    console.log("categories slug:", categoriesSlug); // Outputs the desired middle part of the URL

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
                        My Machine
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        to={`/my-machine/${categoriesSlug}`}
                    >
                        {categoriesSlug}
                    </Link>
                    {subcategoriesSlug && (
                        <Link
                            underline="hover"
                            color="inherit"
                            to={`/my-machine/${categoriesSlug}/${subcategoriesSlug}`}
                        >
                            {subcategoriesSlug}
                        </Link>
                    )}
                    <Typography sx={{ color: 'text.primary' }}>{lastPart ? lastPart : t("my_coupling")}</Typography>
                </Breadcrumbs>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>{lastPart ? lastPart : t("my_machine")}</h1>
                    {/*<h1 className={'page-title'}>{lastPart ? lastPart : t("my_machine")}</h1>*/}
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