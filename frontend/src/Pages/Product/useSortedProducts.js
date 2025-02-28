import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

const useSortedProducts = (filteredProducts, userDetailsPrice) => {
    const { i18n } = useTranslation();
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            if (!sortColumn) return 0;

            let valA = a[sortColumn];
            let valB = b[sortColumn];

            if (sortColumn === "productName") {
                valA = i18n.language === "en"
                    ? a.features?.find(feature => feature.nazwa === "Nazwa w EN")?.wartosc || a.name
                    : i18n.language === "de"
                        ? a.features?.find(feature => feature.nazwa === "Nazwa w DE")?.wartosc || a.name
                        : a.name;
                valB = i18n.language === "en"
                    ? b.features?.find(feature => feature.nazwa === "Nazwa w EN")?.wartosc || b.name
                    : i18n.language === "de"
                        ? b.features?.find(feature => feature.nazwa === "Nazwa w DE")?.wartosc || b.name
                        : b.name;
            }

            if (sortColumn === "dedicatedPrice") {
                valA = a.priceList?.find(price => price.nazwa === userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa)?.netto || 0;
                valB = b.priceList?.find(price => price.nazwa === userDetailsPrice?.enovaPerson?.contractor?.cenaKontrahentaNazwa)?.netto || 0;
            }

            if (sortColumn === "endUserPrice") {
                valA = a.priceList?.find(price => price.nazwa === "End User")?.netto || 0;
                valB = b.priceList?.find(price => price.nazwa === "End User")?.netto || 0;
            }

            if (sortColumn === "Capacity") {
                valA = a.features?.find(feature => feature.nazwa === "Capacity")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Capacity")?.wartosc || 0;
            }

            if (sortColumn === "Depth") {
                valA = a.features?.find(feature => feature.nazwa === "Depth")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Depth")?.wartosc || 0;
            }

            if (sortColumn === "Dimension") {
                valA = a.features?.find(feature => feature.nazwa === "Dimension")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Dimension")?.wartosc || 0;
            }

            if (sortColumn === "Equipment side") {
                valA = a.features?.find(feature => feature.nazwa === "Equipment side")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Equipment side")?.wartosc || 0;
            }

            if (sortColumn === "Existing fork") {
                valA = a.features?.find(feature => feature.nazwa === "Existing fork")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Existing fork")?.wartosc || 0;
            }

            if (sortColumn === "Height") {
                valA = a.features?.find(feature => feature.nazwa === "Height")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Height")?.wartosc || 0;
            }

            if (sortColumn === "Information") {
                valA = a.features?.find(feature => feature.nazwa === "Information")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Information")?.wartosc || 0;
            }

            if (sortColumn === "Length") {
                valA = a.features?.find(feature => feature.nazwa === "Length")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Length")?.wartosc || 0;
            }

            if (sortColumn === "Machine side") {
                valA = a.features?.find(feature => feature.nazwa === "Machine side")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Machine side")?.wartosc || 0;
            }

            if (sortColumn === "Masa do") {
                valA = a.features?.find(feature => feature.nazwa === "Masa do")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Masa do")?.wartosc || 0;
            }

            if (sortColumn === "Masa od") {
                valA = a.features?.find(feature => feature.nazwa === "Masa od")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Masa od")?.wartosc || 0;
            }

            if (sortColumn === "Model") {
                valA = a.features?.find(feature => feature.nazwa === "Model")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Model")?.wartosc || 0;
            }

            if (sortColumn === "More information") {
                valA = a.features?.find(feature => feature.nazwa === "More information")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "More information")?.wartosc || 0;
            }

            if (sortColumn === "OPIS WC") {
                valA = a.features?.find(feature => feature.nazwa === "OPIS WC")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "OPIS WC")?.wartosc || 0;
            }

            if (sortColumn === "Product") {
                valA = a.features?.find(feature => feature.nazwa === "Product")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Product")?.wartosc || 0;
            }

            if (sortColumn === "Recommended Machine weight") {
                valA = a.features?.find(feature => feature.nazwa === "Recommended Machine weight")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Recommended Machine weight")?.wartosc || 0;
            }

            if (sortColumn === "Type") {
                valA = a.features?.find(feature => feature.nazwa === "Type")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Type")?.wartosc || 0;
            }

            if (sortColumn === "Variant") {
                valA = a.features?.find(feature => feature.nazwa === "Variant")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Variant")?.wartosc || 0;
            }

            if (sortColumn === "Volume") {
                valA = a.features?.find(feature => feature.nazwa === "Volume")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Volume")?.wartosc || 0;
            }

            if (sortColumn === "Weight") {
                valA = a.features?.find(feature => feature.nazwa === "Weight")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Weight")?.wartosc || 0;
            }

            if (sortColumn === "Width") {
                valA = a.features?.find(feature => feature.nazwa === "Width")?.wartosc || 0;
                valB = b.features?.find(feature => feature.nazwa === "Width")?.wartosc || 0;
            }

            const numA = parseFloat(valA);
            const numB = parseFloat(valB);

            if (!isNaN(numA) && !isNaN(numB)) {
                valA = numA;
                valB = numB;
            }

            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredProducts, sortColumn, sortOrder, i18n.language, userDetailsPrice]);

    return { sortedProducts, handleSort, sortColumn, sortOrder };
};

export default useSortedProducts;
