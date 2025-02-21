import './Brand.scss';
import { useEffect, useState } from 'react';
import { LinksListWithImages } from '../../Components/LinksListWithImages/LinksListWithImages';
import { useNavigate, useLocation } from 'react-router-dom';
import {ProductDetailsForBrands} from "../Product/ProductDetailsForBrands";
import {ProductDetailsMissingVariants} from "../Product/ProductDetailsMissingVariants";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import i18n from "i18next";

export const Brand = () => {
    const [products, setProducts] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [language, setLanguage] = useState(i18n.language); // Track current language


    // Function to convert string to a URL-safe slug
    const slugify = (text) => {
        return text
            .toLowerCase()
            .replace(/\s+/g, '_') // Replace spaces with dashes
            .replace(/[^\w-]+/g, '%2F'); // Remove non-word characters
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

    console.log(currentSlug)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://se-europe-test.pl/api/variants/no_pagination?brand.name=${currentSlugFilter}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                console.log("brands:", data)
                setFilteredBrands(data)


                // Filter the products to only include those from the current category
                const filteredData = data
                    .filter(item => item.brand?.name && slugify(item.brand.name) === currentSlug) // Check if brand and brand.name exist
                    .map(item => ({
                        name: item.variantname,
                        polishName: item.polishName,
                        germanName: item.germanName,
                        imgUrl: item.domainImagePath, // Images not handled yet
                        brandTitle: item.brand.name,
                        brandTitlePl: item.brand.polishName,
                        brandTitleDe: item.brand.germanName,
                        brandDescription: item.brand.description,
                        brandDescriptionPl: item.brand.polishDescription,
                        brandDescriptionDe: item.brand.germanDescription,
                        slug: slugify(item.variantname),
                    }));
                console.log("filtered:", filteredData);

                setProducts(filteredData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [currentSlug]); // Refetch if the slug changes

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
        return <p>Error: {error}</p>;
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
                ) :
            filteredBrands && filteredBrands.length > 0 ?  (
                <section className={'section-contrains tables-page'}>
                    <div className={'heading-container'}>
                        <h1 className={'page-title'}>
                            {/*{pathParts[pathParts.length - 1]}*/}
                            {i18n.language === 'en' ? (
                                products[0].brandTitle
                            ) : i18n.language === 'pl' ? (
                                products[0].brandTitlePl
                            ) : (
                                products[0].brandTitleDe
                            )}
                        </h1>
                        <p className={'paragraph paragraph--medium'}>
                            {/*Tutaj znajdziesz pełną standardową gamę sprzętu SE Equipment do wózków widłowych.*/}
                            {i18n.language === 'en' ? (
                                products[0].brandDescription
                            ) : i18n.language === 'pl' ? (
                                products[0].brandDescriptionPl
                            ) : (
                                products[0].brandDescriptionDe
                            )}
                        </p>
                        <br/>
                        {/*<p className={'paragraph paragraph--medium'}>*/}
                        {/*    Kliknij na wybrany produkt poniżej, aby znaleźć odpowiedni sprzęt dla siebie.*/}
                        {/*</p>*/}
                    </div>
                    <LinksListWithImages data={products}/>
                </section>
            ) : (
                <ProductDetailsMissingVariants currentSlug={currentSlug}/>
            )}
        </main>
    );
};
