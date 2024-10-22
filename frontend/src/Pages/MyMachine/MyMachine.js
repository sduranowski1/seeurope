import './MyMachine.scss';
import wheelLoader from "../../assets/home/wheel-loader.png";
import excavator from "../../assets/home/excavator.png";
import tractor from "../../assets/home/tractor.png";
import telescopicHandler from "../../assets/home/telescopic-handler.png";
import skidLoader from "../../assets/home/skid-loader.png";
import forkLift from "../../assets/home/fork-lift.png";
import {LinksListWithImages} from "../../Components/LinksListWithImages/LinksListWithImages";
import { useTranslation } from 'react-i18next';

export const MyMachine = () => {
    const products = [
        {name: '3 punkt', imgUrl: wheelLoader},
        {name: 'Atlas', imgUrl: excavator},
        {name: 'Avant-Multione', imgUrl: tractor},
        {name: 'Bobcat', imgUrl: telescopicHandler},
        {name: 'Cat 906', imgUrl: skidLoader},
        {name: 'Dieci', imgUrl: forkLift},
    ];

    const { t } = useTranslation();

    return (
        <main className={'my-machine'}>

            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>{t("my_machine")}</h1>
                </div>
                <LinksListWithImages data={products} />
            </section>
        </main>
    );
}