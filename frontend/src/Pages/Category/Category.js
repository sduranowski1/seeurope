import './Category.scss';
import { useEffect, useState } from 'react';
import { LinksListWithImages } from '../../Components/LinksListWithImages/LinksListWithImages';
import {useNavigate} from "react-router-dom";

export const Category = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Function to convert string to a URL-safe slug
    const slugify = (text) => {
        return text
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with dashes
            .replace(/[^\w-]+/g, ''); // Remove non-word characters
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://se-europe-test.pl/api/subcategories');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                console.log(data)
                // Transform data into desired format
                const transformedData = data.map(item => ({
                    name: item.subCatName,
                    imgUrl: null, // Images not handled yet
                    slug: slugify(item.subCatName),
                }));
                setProducts(transformedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleClick = (slug) => {
        navigate(`/${slug}`);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <main className={'my-machine'}>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>Wózek widłowyy</h1>
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
        </main>
    );
};
