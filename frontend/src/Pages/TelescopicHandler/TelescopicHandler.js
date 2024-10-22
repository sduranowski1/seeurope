import './TelescopicHandler.scss';

import adapter from "../../assets/telescopic-handler/adapter.png";
import zlacza from "../../assets/telescopic-handler/couplings.png";
import zuraw from "../../assets/telescopic-handler/crane.png";
import lyzka from "../../assets/telescopic-handler/grading.png";
import pallet from "../../assets/telescopic-handler/pallet.png";
import widly from "../../assets/telescopic-handler/pallet2.png";
import krokodyl from "../../assets/telescopic-handler/silage.png";
import lyzka2 from "../../assets/tractor/lyzka.png";
import {LinksListWithImages} from "../../Components/LinksListWithImages/LinksListWithImages";

export const TelescopicHandler = () => {
    const products = [
        {name: 'Adapter', imgUrl: adapter},
        {name: 'Złącza', imgUrl: zlacza},
        {name: 'Żuraw', imgUrl: zuraw},
        {name: 'Łyżka wyrównująca', imgUrl: lyzka},
        {name: 'Pallet Fork Frame Hydraulic', imgUrl: pallet},
        {name: 'Mechaniczne widły do palet', imgUrl: widly},
        {name: 'Krokodyl', imgUrl: krokodyl},
        {name: 'Łyżka uniwersalna', imgUrl: lyzka2},
    ];

    return (
        <main className={'my-machine'}>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>Ładowarka teleskopowa</h1>
                    <p className={'paragraph paragraph--medium'}>
                        Tutaj znajdziesz pełną standardową gamę sprzętu SE Equipment do ładowarek teleskopowych.
                        Oferujemy szeroki wybór osprzętu, od łyżek po sprzęt do podnoszenia.
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