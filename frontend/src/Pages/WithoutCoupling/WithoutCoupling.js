import './WithoutCoupling.scss';

import {LinksListWithImages} from "../../Components/LinksListWithImages/LinksListWithImages";

export const WithoutCoupling = () => {
    const products = [
        {name: 'Adapter', imgUrl: ''},
        {name: 'Avjamningsbalk', imgUrl: ''},
        {name: 'Energiklipp', imgUrl: ''},
        {name: 'Gaffelstall', imgUrl: ''},
        {name: 'MaterialHanteringsarm', imgUrl: ''},
        {name: 'Ram', imgUrl: ''},
        {name: 'Trumbarare', imgUrl: ''},
    ];

    return (
        <main className={'my-machine'}>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>Bez złącz</h1>
                    <p className={'paragraph paragraph--medium'}>
                        Tutaj znajdziesz pełną gamę naszych produktów premium bez sprzęgieł.
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
}