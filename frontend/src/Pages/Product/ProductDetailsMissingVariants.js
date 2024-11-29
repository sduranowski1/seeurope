import { useParams } from "react-router-dom";
import {useState} from "react";
import {ThreePoint} from "../ThreePoint/ThreePoint";
import sketch from "../../assets/100838.png";
import {SubcategoryProducts} from "./SubcategoryProducts";
import {VariantProducts} from "./VariantProducts";
import {MissingVariantsProducts} from "./MissingVariantsProducts";

export const ProductDetailsMissingVariants = () => {
    const [itemsToOrder, setItemsToOrder] = useState(1);

    function makeOrder(number) {
        console.log(`${itemsToOrder} ordered`);
    }

    const fullUrl = window.location.href;

    // Get the last part of the slug
    const lastPartOfSlug = fullUrl?.split("/").pop();

    const capitalizedLastPart = lastPartOfSlug
        ? lastPartOfSlug.charAt(0).toUpperCase() + lastPartOfSlug.slice(1)
        : null;

    console.log(lastPartOfSlug)

    return (
        <main className='product-page'>
            <MissingVariantsProducts lastPart={capitalizedLastPart}></MissingVariantsProducts>

        </main>
    );
}