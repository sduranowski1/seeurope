import '../ThreePoint/ThreePoint.scss';
import {BoxWithCheckboxes} from "../../Components/BoxWithCheckboxes/BoxWithCheckboxes";
import {ProductRangeComponent} from "./Components/ProductRangeComponent";
import {TableWithTabs} from "../../Components/TableWithTabs/TableWithTabs";
import {useState, useEffect, useMemo, useCallback} from "react";
import { useTranslation } from 'react-i18next';
import {useNavigate} from "react-router-dom";
import {fetchToken} from "../../utils/fetchToken";
import {SubcategoryTable} from "./Components/SubcategoryTable";
import {ProductDescription} from "./Components/ProductDescription";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import * as React from "react";

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

    function findCheckboxes() {
        return Object.values(productsData.tableData).flat().reduce((acc, product) => {
            if (!acc.hasOwnProperty(product.coupling)) {
                acc[product.coupling] = false;
            }
            return acc;
        }, {});
    }

    useEffect(() => {
        const uniqueCheckboxes = findCheckboxes();
        setCheckboxes(uniqueCheckboxes);
    }, [productsData.tableData]);

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
            const token = await fetchToken();
            setToken(token);

            const response = await fetch('https://se-europe-test.pl/api/PanelWWW_API/DajTowary?nazwa=Koszt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    strona: currentPage,
                    limit: limit,
                    pokazCeny: true,
                    poleSortowane: "ID",
                    czyRosnaco: 1,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error in product request: ${response.statusText}`);
            }

            const data = await response.json();

            // Map product data with brand and variant names
            const productsData = data.elementy.map((product) => {
                const dealerDetalPrice = product.listaCen.find((price) => price.nazwa === 'Dealer Detal');
                const netto = dealerDetalPrice ? dealerDetalPrice.netto : null;

                const wzrostu = product.listaCechy.find((value) => value.nazwa === '% wzrostu');
                const procWzrostu = wzrostu ? wzrostu.wartosc : null;

                const replacement = product.listaCechy.find((value) => value.nazwa === 'Części zamienne');
                const replacementParts = replacement ? replacement.wartosc : null;

                const capacity = product.listaCechy.find((value) => value.nazwa === 'Capacity');
                const capacityFeat = capacity ? capacity.wartosc : null;

                const brandName = brands.find((brand) => brand.id === product.productInfo?.braid)?.name || 'N/A';
                const variantName = variants.find((variant) => variant.id === product.productInfo?.varid)?.variantname || 'N/A';
                const categoryName = categories.find((category) => category.id === product.productInfo?.catid)?.name || 'N/A';
                const subcategoryName = subcategories.find((subcategory) => subcategory.id === product.productInfo?.scatid)?.subCatName || 'N/A';

                return { ...product, netto, procWzrostu, replacementParts, capacityFeat,  brandName, variantName, categoryName, subcategoryName };
            });

            console.log(productsData)

            setProducts(productsData);
            setTotalItems(data.liczbaWszystkich);
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

    useEffect(() => {
        // Get the last part of the slug
        const slugParts = window.location.pathname.split("/").filter(Boolean); // Split by "/" and remove empty strings
        const normalizedLastPart = slugParts.at(-1)?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(); // Normalize the last part

        console.log("Normalized Last Part (Brand):", normalizedLastPart);

        // Filter products by the normalized brand name
        const filtered = products.filter((product) => {
            const normalizedBrand = product.brandName
                ?.replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase(); // Normalize product brand name

            console.log("Normalized Product Brand:", normalizedBrand);

            return normalizedBrand === normalizedLastPart;
        });

        setFilteredProducts(filtered);
    }, [products, lastPart]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    return (
        <main>
            <section className={'section-contrains tables-page'}>
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
                            <ProductRangeComponent/>
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
                </div>)}
            </section>
        </main>
    );
}