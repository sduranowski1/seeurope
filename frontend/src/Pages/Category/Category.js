import './Category.scss';
import { useEffect, useState } from 'react';
import { LinksListWithImages } from '../../Components/LinksListWithImages/LinksListWithImages';
import { useNavigate, useLocation } from 'react-router-dom';
import {ProductDetailsMissingVariants} from "../Product/ProductDetailsMissingVariants";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import {ProductDetails} from "../Product/ProductDetails";
import i18n from "i18next";

export const Category = () => {
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
            .replace(/[^\w-]+/g, '%2F'); // Remove non-word characters
    };

    // Get the current category slug from the URL
    const pathParts = location.pathname.split('/');
    const currentSlug = slugify(pathParts[pathParts.length - 1]); // Last part of the URL

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true); // Ensure loading state is true before starting the fetch
            try {
                const response = await fetch('https://se-europe-test.pl/api/subcategories');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                console.log(data);

                // Filter the products to only include those from the current category
                const filteredData = data
                    .filter(item => slugify(item.category.name) === currentSlug)
                    .map(item => ({
                        name: item.subCatName,
                        imgUrl: item.domainImagePath, // Images not handled yet
                        slug: slugify(item.subCatName),
                        categoryTitle: item.category.name,
                        categoryTitlePl: item.category.polishName,
                        categoryTitleDe: item.category.germanName,
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

    console.log(products);
    // console.log(products[0].categoryTitle);
    // console.log(products[0].categoryTitlePl);

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
                            {/*{products[0].categoryTitle}*/}
                            {i18n.language === 'en' ? (
                                products[0].categoryTitle
                            ) : i18n.language === 'pl' ? (
                                products[0].categoryTitlePl
                            ) : (
                                products[0].categoryTitleDe
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
                <ProductDetails currentSlug={currentSlug}/>
            )}
        </main>
    );
};
