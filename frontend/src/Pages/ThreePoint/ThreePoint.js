import './ThreePoint.scss';
import {BoxWithCheckboxes} from "../../Components/BoxWithCheckboxes/BoxWithCheckboxes";
import {SliderRangeComponent} from "../../Components/SliderRangeComponent/SliderRangeComponent";
import {TableWithTabs} from "../../Components/TableWithTabs/TableWithTabs";
import {useState, useEffect} from "react";
import { useTranslation } from 'react-i18next';

const productsData = {
    name: '3 POINT',
    description: 'We deliver and stock equipment for tractors.',
    couplings: [],
    tableData: {
        adapter: [
            {
                artNo: 100838,
                coupling: '3 punkt',
                width: 1134,
                height: 781,
                capacity: 2500,
                machineSide: '3punkt',
                equipmentSide: 'SMS/Euro',
                weight: 87
            },
            {
                artNo: 100839,
                coupling: '3 punkt',
                width: 1165,
                height: 850,
                capacity: 5000,
                machineSide: '3punkt',
                equipmentSide: 'Stora BM',
                weight: 121
            },
            {
                artNo: 113542,
                coupling: 'Big BM / 3 punkt',
                width: 1184,
                height: 492,
                capacity: 2500,
                machineSide: 'Big BM/3 punkt',
                equipmentSide: 'SMS/Euro',
                weight: 134
            }
        ],
        stengrep: [
            {
                artNo: 113224,
                coupling: '3 punkt',
                width: 2000,
                height: 600,
                depth: 1000,
                horn: 35,
                bump: 'JA',
                weight: 335
            },
        ]
    }
};

export const ThreePoint = () => {
    const [displayedItems, setDisplayedItems] = useState([0, 1000000]);
    const [checkboxes, setCheckboxes] = useState({});

    function findCheckboxes() {
        return Object.values(productsData.tableData).flat().reduce((acc, product) => {
            if (!acc.hasOwnProperty(product.coupling)) {
                acc[product.coupling] = false;
            }
            return acc;
        }, {});
    }

    useEffect(() => {
        const uniqueCheckboxes = findCheckboxes();
        setCheckboxes(uniqueCheckboxes);
    }, [productsData.tableData]);

    const { t } = useTranslation();

    return (
        <main>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>{t("my_coupling")}</h1>
                    <p className={'paragraph paragraph--medium'}>{t("tractor_equipment")}</p>
                </div>
                <div className={'available-choices-container'}>
                    <div className={'choice-container'}>
                        <h2>{t("machine_weight")}</h2>
                        <SliderRangeComponent productsData={productsData} setDisplayedItems={setDisplayedItems}/>
                    </div>
                    <div className={'choice-container'}>
                        <h2>{t("coupling")}</h2>
                        <div className={'choice-container__checkboxes'}>
                            {checkboxes && Object.keys(checkboxes).map((name, i) => {
                                return (
                                    <BoxWithCheckboxes
                                        key={i}
                                        label={name}
                                        checkboxes={checkboxes}
                                        setCheckboxes={(checkboxValue) => setCheckboxes(checkboxValue)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <TableWithTabs productsData={productsData} displayedItems={displayedItems} checkboxes={checkboxes}/>
            </section>
        </main>
    );
}