import './MyMachine.scss';
import wheelLoader from "../../assets/home/wheel-loader.png";
import excavator from "../../assets/home/excavator.png";
import tractor from "../../assets/home/tractor.png";
import telescopicHandler from "../../assets/home/telescopic-handler.png";
import skidLoader from "../../assets/home/skid-loader.png";
import forkLift from "../../assets/home/fork-lift.png";
import {LinksListWithImages} from "../../Components/LinksListWithImages/LinksListWithImages";
import { useTranslation } from 'react-i18next';
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Box, CircularProgress} from "@mui/material";

export const MyMachine = () => {
    // const products = [
    //     {name: '3 punkt', imgUrl: wheelLoader},
    //     {name: 'Atlas', imgUrl: excavator},
    //     {name: 'Avant-Multione', imgUrl: tractor},
    //     {name: 'Bobcat', imgUrl: telescopicHandler},
    //     {name: 'Cat 906', imgUrl: skidLoader},
    //     {name: 'Dieci', imgUrl: forkLift},
    // ];

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { t } = useTranslation();


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
            try {
                const response = await fetch('https://se-europe-test.pl/api/categories/no_pagination' +
                    '');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                console.log(data);

                // Filter the products to only include those from the current category
                const filteredData = data
                    // .filter(item => slugify(item.brand.name) === currentSlug)
                    .map(item => ({
                        name: item.name,
                        polishName: item.polishName,
                        germanName: item.germanName,
                        imgUrl: item.domainImagePath, // Images not handled yet
                        slug: slugify(item.name),
                    }));
                console.log(filteredData);

                setProducts(filteredData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [currentSlug]); // Refetch if the slug changes

    if (isLoading) {
        return <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50vh" // Or use specific height if you want it in a smaller area
            width="100%"
        >
            <CircularProgress />
        </Box>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <main className={'my-machine'}>

            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>{t("my_machine")}</h1>
                </div>
                <LinksListWithImages data={products} />
            </section>
        </main>
    );
}