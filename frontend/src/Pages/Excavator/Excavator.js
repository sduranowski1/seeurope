import './Excavator.scss';
import adapter from "../../assets/excavator/adapter.png";
import cutter from "../../assets/excavator/asphalt.png";
import grading from "../../assets/excavator/grading-beam.png";
import trench from "../../assets/excavator/trench-bucket.png";
import ecoCut from "../../assets/excavator/eco-cut.png";
import widly2 from "../../assets/excavator/pallet.png";
import stoneBucket from "../../assets/excavator/stone-bucket.png";
import digging from "../../assets/excavator/digging.png";
import diggingPackage from "../../assets/excavator/digging-package.png";
import crane from "../../assets/excavator/crane.png";
import leveller from "../../assets/excavator/leveller.png";
import gradingBucket from "../../assets/excavator/grading-bucket.png";
import frame from "../../assets/excavator/frame.png";
import cable from "../../assets/excavator/cable.png";
import sweeper from "../../assets/excavator/sweeper.png";
import hydraulic from "../../assets/excavator/hydraulic.png";
import rake from "../../assets/excavator/rake.png";
import ripper from "../../assets/excavator/ripper.png";
import cableDrum from "../../assets/excavator/cable-drum.png";
import wdBucket from "../../assets/excavator/wd-bucket.png";
import coupling from "../../assets/excavator/couplings.png";
import {LinksListWithImages} from "../../Components/LinksListWithImages/LinksListWithImages";
import {useTranslationContext} from "../../TranslationContext";

export const Excavator = () => {
    const products = [
        {name: 'Adapter', imgUrl: adapter},
        {name: 'Asphalt cutter', imgUrl: cutter},
        {name: 'Grading beam', imgUrl: grading},
        {name: 'Trench bucket', imgUrl: trench},
        {name: 'Eco cut', imgUrl: ecoCut},
        {name: 'Widly do palet', imgUrl: widly2},
        {name: 'Stone bucket', imgUrl: stoneBucket},
        {name: 'Digging bucket', imgUrl: digging},
        {name: 'Digging package', imgUrl: diggingPackage},
        {name: 'Isrivarblad', imgUrl: ''},
        {name: 'Łyżka kablowa', imgUrl: cable},
        {name: 'Rake', imgUrl: rake},
        {name: 'Crane jib', imgUrl: crane},
        {name: 'Równiarka', imgUrl: leveller},
        {name: 'Łyżka wyrównująca', imgUrl: gradingBucket},
        {name: 'Frame', imgUrl: frame},
        {name: 'Zamiatarki', imgUrl: sweeper},
        {name: 'Hydraulic sweeper', imgUrl: hydraulic},
        {name: 'Kieł zrywający', imgUrl: ripper},
        {name: 'Cable drum lifter', imgUrl: cableDrum},
        {name: 'WD Łyżka kopiąca', imgUrl: wdBucket},
        {name: 'Złącza', imgUrl: coupling},
    ];

    const { t, changeLanguage } = useTranslationContext();

    return (
        <main className={'my-machine'}>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>{t("excavator")}</h1>
                      <p className={'paragraph paragraph--medium'}>
                        {t("excavator_description_1")}
                      </p>
                      <br />
                      <p className={'paragraph paragraph--medium'}>
                        {t("excavator_description_2")}
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