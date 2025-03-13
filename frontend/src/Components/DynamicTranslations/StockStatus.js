import { useTranslation } from "react-i18next";

export const StockStatus = ({ stockStatus }) => {
    const { t } = useTranslation();

    return <>{t(`productList.stockStatus.${stockStatus}`, t("productList.stockStatus.notAvailable"))}</>;
};
