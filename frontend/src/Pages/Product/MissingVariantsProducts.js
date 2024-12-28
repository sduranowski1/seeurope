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
import {SubcategoryTableBrands} from "./Components/SubcategoryTableBrands";
import Slider from "@mui/material/Slider";
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

export const MissingVariantsProducts = ({lastPart, slug}) => {
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
            const [brandsResponse, variantsResponse] = await Promise.all([
                fetch(`https://se-europe-test.pl/api/brands`),
                fetch('https://se-europe-test.pl/api/variants'),
                // fetch('https://se-europe-test.pl/api/categories'),
                // fetch('https://se-europe-test.pl/api/subcategories'),
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
            // const response = await fetch('https://se-europe-test.pl/api/PanelWWW_API/DajTowary?nazwa=Koszt', {
            const response = await fetch(`https://se-europe-test.pl/api/enova_products?productInfo.brand.name=${lastPart}`, {
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

                // const brandName = brands.find((brand) => brand.id === product.productInfo?.braid)?.name || '';
                const variantName = variants.find((variant) => variant.id === product.productInfo?.varid)?.variantname || '';

                return { ...product, procWzrostu, replacementParts, capacityFeat,  variantName};
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

    useEffect(() => {
        fetchAdditionalData();
    }, [lastPart]); // Only fetch brands and variants once on mount

    useEffect(() => {
        if (brands.length > 0 && variants.length > 0) {
            fetchProductData();
        }
    }, [brands, variants, currentPage, limit, lastPart]); // Fetch product data after brands and variants are loaded

    const handlePageChange = useCallback((page) => {
        if (page >= 1 && page <= totalPages && !loading) {
            setCurrentPage(page);
        }
    }, [totalPages, loading]);

    const handleRowClick = useCallback((productId) => {
        navigate(`/admin/enova-products/${productId}`);
    }, [navigate]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    // Filter products based on weight range
    useEffect(() => {
        const filtered = products.filter((product) => {
            const capacity = parseFloat(product.capacityFeat?.replace(/[^\d.-]/g, "") || 0);
            return capacity >= weightRange[0] && capacity <= weightRange[1];
        });
        setFilteredProducts(filtered);
    }, [products, weightRange]);

    // Handle weight range change
    const handleWeightRangeChange = (event, newValue) => {
        setWeightRange(newValue);
    };

    // Find the maximum weight in the filtered products
    const maxWeight = Math.max(
        ...products.map(product => parseFloat(product.capacityFeat.replace(/[^\d.-]/g, "")) || 0),
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
                            {/*<div>*/}
                            {/*    <h3>Filter by Weight</h3>*/}
                            {/*    <Slider*/}
                            {/*        value={weightRange}*/}
                            {/*        onChange={handleWeightRangeChange}*/}
                            {/*        valueLabelDisplay="auto"*/}
                            {/*        valueLabelFormat={(value) => `${value}kg`}*/}
                            {/*        min={0}*/}
                            {/*        max={maxWeight} // Dynamically set the max value based on filtered products*/}
                            {/*        marks={[*/}
                            {/*            { value: 0, label: "0 kg" },*/}
                            {/*            { value: maxWeight / 2, label: `${maxWeight / 2} kg` }, // Midpoint mark*/}
                            {/*            { value: maxWeight, label: `${maxWeight} kg` },*/}
                            {/*        ]}*/}
                            {/*    />*/}
                            {/*</div>*/}
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
                    {/*<SubcategoryTable productsData={productsData} displayedItems={displayedItems}/>*/}
                    {/*<SubcategoryTable productsData={productsData} displayedItems={displayedItems} checkboxes={checkboxes}/>*/}
                    <SubcategoryTableBrands
                        productsData={filteredProducts}
                        onProductClick={handleProductClick}
                        lastPartToCollapse={lastPart}
                    />
                    {/*{selectedProduct && (*/}
                    {/*    <ProductDescription product={selectedProduct} productsData={filteredProducts}/>*/}
                    {/*)}*/}
                </div>)}
            </section>
        </main>
    );
}