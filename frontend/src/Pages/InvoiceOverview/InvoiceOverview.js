import * as React from "react";
import {TableComponent2} from "../../Components/TableComponent2/TableComponent2";
import {BoxWithCheckboxes} from "../../Components/BoxWithCheckboxes/BoxWithCheckboxes";
import {useEffect, useState} from "react";


const productsData = {
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
        ]
    }
};

export const InvoiceOverview = () => {

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


    return (
        <main>
            <section className={'section-contrains tables-page'}>
                <div>
                    <h1 className={'page-title'}>PRZEGLĄD FAKTUR</h1>
                    <p className={'paragraph paragraph--medium'}>Tutaj będziesz mógł zobaczyć wszystkie swoje faktury, zarówno opłacone, jak i nieopłacone.
                        Kliknij „Pokaż wszystkie”, aby zobaczyć wszystkie swoje faktury.</p>
                    <div className={'choice-container__checkboxes'}>
                        {checkboxes && Object.keys(checkboxes).map((name, i) => {
                            return (
                                <BoxWithCheckboxes key={i} label={name} checkboxes={checkboxes} setCheckboxes={(checkboxValue) => setCheckboxes(checkboxValue)} />
                            )
                        })}
                    </div>
                    { Object.values(productsData.tableData).map((table, i) => {
                        return (

                                <TableComponent2 data={table} checkboxes={checkboxes} />

                        )
                    })}
                </div>
            </section>
        </main>
    );
}