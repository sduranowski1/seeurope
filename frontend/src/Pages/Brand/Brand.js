import './Brand.scss';
import { useEffect, useState } from 'react';
import { LinksListWithImages } from '../../Components/LinksListWithImages/LinksListWithImages';
import { useNavigate, useLocation } from 'react-router-dom';
import {ProductDetailsForBrands} from "../Product/ProductDetailsForBrands";
import {ProductDetailsMissingVariants} from "../Product/ProductDetailsMissingVariants";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";

export const Brand = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Function to convert string to a URL-safe slug
    const slugify = (text) => {
        return text
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with dashes
            .replace(/[^\w-]+/g, ''); // Remove non-word characters
    };

    // Get the current category slug from the URL
    const pathParts = location.pathname.split('/');
    const currentSlug = slugify(pathParts[pathParts.length - 1]); // Last part of the URL

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://se-europe-test.pl/api/variants');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                console.log("brands:", data)

                // Filter the products to only include those from the current category
                const filteredData = data
                    .filter(item => item.brand?.name && slugify(item.brand.name) === currentSlug) // Check if brand and brand.name exist
                    .map(item => ({
                        name: item.variantname,
                        imgUrl: item.domainImagePath, // Images not handled yet
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
            {products && products.length > 0 ? (
                <section className={'section-contrains tables-page'}>
                    <div className={'heading-container'}>
                        <h1 className={'page-title'}>
                            {pathParts[pathParts.length - 1]}
                        </h1>
                        <p className={'paragraph paragraph--medium'}>
                            Tutaj znajdziesz pełną standardową gamę sprzętu SE Equipment do wózków widłowych.
                        </p>
                        <br/>
                        <p className={'paragraph paragraph--medium'}>
                            Kliknij na wybrany produkt poniżej, aby znaleźć odpowiedni sprzęt dla siebie.
                        </p>
                    </div>
                    <LinksListWithImages data={products}/>
                </section>
            ) : (
                <ProductDetailsMissingVariants/>
            )}
        </main>
    );
};
