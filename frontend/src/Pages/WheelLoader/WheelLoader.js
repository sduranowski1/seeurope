import './WheelLoader.scss';
import adapter from "../../assets/wheel-loader/adapter.png";
import walec from "../../assets/wheel-loader/grading-beam.png";
import chwytak from "../../assets/wheel-loader/bale-clamp.png";
import widly from "../../assets/wheel-loader/bale-spear.png";
import kontener from "../../assets/wheel-loader/container.jpg";
import widly2 from "../../assets/wheel-loader/pallet.png";
import iceRipper from "../../assets/wheel-loader/ice.png";
import multi from "../../assets/wheel-loader/multi.png";
import krokodyl from "../../assets/wheel-loader/silage.png";
import loader from "../../assets/wheel-loader/loader.png";
import lightWeight from "../../assets/wheel-loader/light-weight.png";
import crane from "../../assets/wheel-loader/crane.png";
import leveller from "../../assets/wheel-loader/leveller.png";
import grading from "../../assets/wheel-loader/grading-bucket.png";
import frame from "../../assets/wheel-loader/frame.png";
import container from "../../assets/wheel-loader/container.png";
import sand from "../../assets/wheel-loader/sand-spreader.png";
import snow from "../../assets/wheel-loader/snow-side.png";
import stone from "../../assets/wheel-loader/stone-ripper.png";
import snowFork from "../../assets/wheel-loader/stone-fork.png";
import hak from "../../assets/wheel-loader/big-bag.png";
import lumber from "../../assets/wheel-loader/lumber-grip.png";
import snowplough from "../../assets/wheel-loader/v-snowplough.png";
import universal from "../../assets/wheel-loader/universal.png";
import concrete from "../../assets/wheel-loader/concrete.png";
import coupling from "../../assets/wheel-loader/coupling.png";
import {LinksListWithImages} from "../../Components/LinksListWithImages/LinksListWithImages";
import {useTranslationContext} from "../../TranslationContext";

export const WheelLoader = () => {
    const products = [
        {name: 'Adapter', imgUrl: adapter},
        {name: 'Łyżka wyrównująca', imgUrl: walec},
        {name: 'Chwytak do bel', imgUrl: chwytak},
        {name: 'Widły do bel', imgUrl: widly},
        {name: 'Kontener', imgUrl: kontener},
        {name: 'Widly do palet', imgUrl: widly2},
        {name: 'Ice ripper bucket', imgUrl: iceRipper},
        {name: 'Multi purpose bucket', imgUrl: multi},
        {name: 'Krokodyl', imgUrl: krokodyl},
        {name: 'Łyżka ładowarkowa', imgUrl: loader},
        {name: 'Łyżka do materiałów sypkich', imgUrl: lightWeight},
        {name: 'Żuraw', imgUrl: crane},
        {name: 'Leveller girder', imgUrl: leveller},
        {name: 'Łyżka wyrównująca', imgUrl: grading},
        {name: 'Frame', imgUrl: frame},
        {name: 'Hak do kontenera', imgUrl: container},
        {name: 'Łyżka do rozrzucania piasku', imgUrl: sand},
        {name: 'Snow side/Extension part', imgUrl: snow},
        {name: 'Kły do kamieni', imgUrl: stone},
        {name: 'Łyżka do kamieni', imgUrl: snowFork},
        {name: 'Hak do big bagów', imgUrl: hak},
        {name: 'Lumber grip', imgUrl: lumber},
        {name: 'Pług do odśnieżania V kształtny', imgUrl: snowplough},
        {name: 'Łyżka uniwersalna', imgUrl: universal},
        {name: 'Łyżka do betonu', imgUrl: concrete},
        {name: 'Złącza', imgUrl: coupling},
    ];

    const { t, changeLanguage } = useTranslationContext();


    return (
        <main className={'my-machine'}>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>{t("wheel_loader")}</h1>
                    <p className={'paragraph paragraph--medium'}>
                        {t("wheel_loader_equipment")}
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        {t("click_product_info")}
                    </p>
                </div>
                <LinksListWithImages data={products} />
            </section>
        </main>
    );
}