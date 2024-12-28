import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {ThreePoint} from "../ThreePoint/ThreePoint";
import sketch from "../../assets/100838.png";
import {SubcategoryProducts} from "./SubcategoryProducts";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent";
import {Subcategory} from "../Subcategory/Subcategory";
import {Category} from "../Category/Category";

export const ProductDetails = ({currentSlug}) => {
    const { slug } = useParams();
    const [itemsToOrder, setItemsToOrder] = useState(1);
    const [hasSubcategoryValues, setHasSubcategoryValues] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    function makeOrder(number) {
        console.log(`${itemsToOrder} ordered`);
    }

    // Get the last part of the slug
    // const lastPartOfSlug = slug?.split("/").pop();
    const lastPartOfSlug = currentSlug;
    const capitalizedLastPart = lastPartOfSlug
        ? lastPartOfSlug.charAt(0).toUpperCase() + lastPartOfSlug.slice(1)
        : null;

    // Fetch subcategory data
    useEffect(() => {
        async function fetchSubcategoryData() {
            try {
                const response = await fetch("https://se-europe-test.pl/api/item_types");
                const data = await response.json();

                // Check if the subcategory has values
                const subcategory = data.find(item => item.slug === slug);
                if (subcategory && subcategory.values && subcategory.values.length > 0) {
                    setHasSubcategoryValues(true);
                } else {
                    setHasSubcategoryValues(false);
                }
            } catch (error) {
                console.error("Error fetching subcategory data:", error);
                setHasSubcategoryValues(false); // Default to false if API call fails
            } finally {
                setIsLoading(false);
            }
        }

        fetchSubcategoryData();
    }, [slug]);

    if (isLoading) {
        return <LoadingComponent/>
    }

    return (
        <main className="product-page">
            {hasSubcategoryValues ? (
                <SubcategoryProducts lastPart={capitalizedLastPart} slug={slug} />
            ) : (
                <Subcategory />
            )}
        </main>
    );
};