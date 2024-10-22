import './MyCoupling.scss';
import atlas from "../../assets/couplings/Atlas65.png";
import avant from "../../assets/couplings/avant.png";
import bobcat from "../../assets/couplings/bobcat.png";
import cat from "../../assets/couplings/cat906.png";
import euro from "../../assets/couplings/euro.png";
import giant from "../../assets/couplings/giant.png";
import hydrema from "../../assets/couplings/hydrema.png";
import jcb from "../../assets/couplings/jcb.png";
import johnDeere from "../../assets/couplings/john deere.png";
import kramer180 from "../../assets/couplings/kramer.png";
import kramer380 from "../../assets/couplings/kramer2.png";
import l20 from "../../assets/couplings/lv.png";
import smallBm from "../../assets/couplings/smallBM.png";
import manitou from "../../assets/couplings/manitou.png";
import s1Upp from "../../assets/couplings/s1upp.png";
import sCouplings from "../../assets/couplings/scouplings.png";
import sms from "../../assets/couplings/sms.png";
import bigBm from "../../assets/couplings/bigBM.png";
import terex from "../../assets/couplings/terex.png";
import weidemann from "../../assets/couplings/weidemann.png";
import {LinksListWithImages} from "../../Components/LinksListWithImages/LinksListWithImages";
import { useTranslation } from 'react-i18next';

export const MyCoupling = () => {
    const products = [
        {name: '3 punkt', imgUrl: ''},
        {name: 'Atlas', imgUrl: atlas},
        {name: 'Avant', imgUrl: avant},
        {name: 'Bobcat', imgUrl: bobcat},
        {name: 'Cat 906', imgUrl: cat},
        {name: 'Dieci', imgUrl: ''},
        {name: 'Euro', imgUrl: euro},
        {name: 'Faresin', imgUrl: ''},
        {name: 'Giant', imgUrl: giant},
        {name: 'Hydrema 45', imgUrl: hydrema},
        {name: 'ISME', imgUrl: ''},
        {name: 'JCB', imgUrl: jcb},
        {name: 'John Deere', imgUrl: johnDeere},
        {name: 'Kramer 180-350', imgUrl: kramer180},
        {name: 'Kramer 380-580', imgUrl: kramer380},
        {name: 'L20/L25 UPP TILL L220', imgUrl: l20},
        {name: 'LILLA BM', imgUrl: smallBm},
        {name: 'Magni', imgUrl: ''},
        {name: 'Manitou', imgUrl: manitou},
        {name: 'S1 UPP TILL S3', imgUrl: s1Upp},
        {name: 'S30 UPP TILL S90', imgUrl: sCouplings},
        {name: 'SMP 105', imgUrl: ''},
        {name: 'Sms', imgUrl: sms},
        {name: 'Stora Bm', imgUrl: bigBm},
        {name: 'Terex', imgUrl: terex},
        {name: 'Triangelfaste', imgUrl: ''},
        {name: 'Vl', imgUrl: ''},
        {name: 'Weidemann', imgUrl: weidemann},
        {name: 'Wille', imgUrl: ''},
        {name: 'Alo', imgUrl: ''},
    ];

    const { t } = useTranslation();


    return (
        <main className={'my-machine'}>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>{t("my_coupling")}</h1>
                    <p className={'paragraph paragraph--medium'}>{t("click")}</p>
                </div>
                <LinksListWithImages data={products} />
            </section>
        </main>
    );
}