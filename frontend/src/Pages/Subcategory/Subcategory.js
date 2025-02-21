import './Subcategory.scss';
import { useEffect, useState } from 'react';
import { LinksListWithImages } from '../../Components/LinksListWithImages/LinksListWithImages';
import { useNavigate, useLocation } from 'react-router-dom';
import {ProductDetailsMissingVariants} from "../Product/ProductDetailsMissingVariants";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import {SubcategoryProducts} from "../Product/SubcategoryProducts";
import i18n from "i18next";

export const Subcategory = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoadingContent, setIsLoadingContent] = useState(true); // State to track loading
    const [language, setLanguage] = useState(i18n.language); // Track current language


    // Function to convert string to a URL-safe slug
    const slugify = (text) => {
        return text
            .toLowerCase()
            .replace(/\s+/g, '_') // Replace spaces with dashes
            .replace(/[^\w-]+/g, ''); // Remove non-word characters
    };

    const slugifyFilter = (text) => {
        return text
            .toLowerCase()
            .replace(/\s+/g, '_') // Replace spaces with dashes
            .replace(/%2F/gi, '/'); // Replace '%2F' with '/'

    };

    // Get the current category slug from the URL
    const pathParts = location.pathname.split('/');
    const currentSlug = slugify(pathParts[pathParts.length - 1]); // Last part of the URL
    const currentSlugFilter = slugifyFilter(pathParts[pathParts.length - 1]); // Last part of the URL
    const secondSlugFilter = slugifyFilter(pathParts[pathParts.length - 2]); // Last part of the URL

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true); // Ensure loading state is true before starting the fetch
            try {
                const response = await fetch(`https://se-europe-test.pl/api/item_types/no_pagination?subcategory.subCatName=${currentSlugFilter}&subcategory.category.name=${secondSlugFilter}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                console.log(data);

                // Filter the products to only include those from the current category
                const filteredData = data
                    .filter(item => slugify(item.subcategory.subCatName) === currentSlug)
                    .map(item => ({
                        name: item.name,
                        imgUrl: item.domainImagePath, // Images not handled yet
                        slug: slugify(item.name),
                        subcategoryTitle: item.subcategory.subCatName,
                        subcategoryTitlePl: item.subcategory.polishSubCatName,
                        subcategoryTitleDe: item.subcategory.germanSubCatName,
                    }));

                setProducts(filteredData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false); // Set loading state to false once data is fetched
            }
        };

        fetchProducts();
    }, [currentSlug]); // Refetch when currentSlug changes

    // Handle language change
    useEffect(() => {
        const handleLanguageChange = () => {
            setLanguage(i18n.language); // Update state when language changes
        };

        i18n.on('languageChanged', handleLanguageChange); // Listen for language changes

        return () => {
            i18n.off('languageChanged', handleLanguageChange); // Clean up listener
        };
    }, []); // Only run once when component mounts

    const handleClick = (slug) => {
        navigate(`/${slug}`);
    };

    const fullUrl = window.location.href;

    // Get the last part of the slug
    const lastPartOfSlug = fullUrl?.split("/").pop();

    const capitalizedLastPart = lastPartOfSlug
        ? lastPartOfSlug.charAt(0).toUpperCase() + lastPartOfSlug.slice(1)
        : null;

    console.log(lastPartOfSlug)
    // console.log(products[0].subcategoryTitle)

    if (isLoading) {
        return (
            <section className={'section-contrains tables-page'}>
                <div className={'loading-container'}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="40vh" // Or use specific height if you want it in a smaller area
                        width="100%"
                    >
                        <CircularProgress/>
                    </Box>
                </div>
            </section>
        );
    }

    if (error) {
        return <p>Error: {error}</p>
            ;
    }

    return (
        <main className={'my-machine'}>
            {isLoading ? (
                <section className={'section-contrains tables-page'}>
                    <div className={'loading-container'}>
                        {/* You can use a spinner, animation, or text as a loading indicator */}
                        <div className="spinner">
                            <p>Loading...</p>
                        </div>
                    </div>
                </section>
            ) : products && products.length > 0 ? (
                <section className={'section-contrains tables-page'}>
                    <div className={'heading-container'}>
                        <h1 className={'page-title'}>
                            {/*{pathParts[pathParts.length - 1]}*/}
                            {i18n.language === 'en' ? (
                                products[0].subcategoryTitle
                            ) : i18n.language === 'pl' ? (
                                products[0].subcategoryTitlePl
                            ) : (
                                products[0].subcategoryTitleDe
                            )}
                        </h1>
                        <p className={'paragraph paragraph--medium'}>
                            Tutaj znajdziesz pełną standardową gamę sprzętu SE Equipment do wózków widłowych.
                        </p>
                        <br />
                        <p className={'paragraph paragraph--medium'}>
                            Kliknij na wybrany produkt poniżej, aby znaleźć odpowiedni sprzęt dla siebie.
                        </p>
                    </div>
                    <LinksListWithImages data={products} />
                </section>
            ) : (
                <SubcategoryProducts lastPart={capitalizedLastPart}/>
            )}
        </main>
    );
};
