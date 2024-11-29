import { useParams } from "react-router-dom";
import {useState} from "react";
import {ThreePoint} from "../ThreePoint/ThreePoint";
import sketch from "../../assets/100838.png";
import {SubcategoryProducts} from "./SubcategoryProducts";
import {VariantProducts} from "./VariantProducts";

export const ProductDetailsForBrands = () => {
    const { slug } = useParams();
    const [itemsToOrder, setItemsToOrder] = useState(1);

    function makeOrder(number) {
        console.log(`${itemsToOrder} ordered`);
    }

    // Get the last part of the slug
    const lastPartOfSlug = slug?.split("/").pop();

    const capitalizedLastPart = lastPartOfSlug
        ? lastPartOfSlug.charAt(0).toUpperCase() + lastPartOfSlug.slice(1)
        : null;

    return (
        <main className='product-page'>
            <VariantProducts lastPart={capitalizedLastPart} slug={slug}></VariantProducts>

        </main>
    );
}