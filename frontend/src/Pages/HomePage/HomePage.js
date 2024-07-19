import './HomePage.scss';
import vehiclePart from '../../assets/home/vehicle-part.png';
import construction from '../../assets/home/construction.png';
import excavator from '../../assets/home/excavator.png';
import wheelLoader from '../../assets/home/wheel-loader.png';
import tractor from '../../assets/home/tractor.png';
import telescopicHandler from '../../assets/home/telescopic-handler.png';
import skidLoader from '../../assets/home/skid-loader.png';
import forkLift from '../../assets/home/fork-lift.png';
import React from 'react';
import { Link } from "react-router-dom";
import { InstaFeed } from "../../Components/InstaFeed/InstaFeed";
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <section className={'screenwide-photo-section'}>
        <picture className={'screenwide'}>
          <img src={vehiclePart} alt={t('vehicle_part', 'Vehicle part')} />
        </picture>
        <div className={'section-contrains'}>
          <Link to={'/o-nas/znajdz-posrednika'} className={'button button--reseller'}>
            {t('find_reseller')}
          </Link>
        </div>
      </section>
      <section className={'section-contrains place-order'}>
        <div className={'gradient-box-container'}>
          <div className={'gradient-box'}>
            <h2 className={'section-title'}>{t('place_order_title')}</h2>
            <p className={'section-subtitle'}>{t('place_order_subtitle')}</p>
            <span className={'paragraph'}>{t('place_order_note')}</span>
          </div>
          <div className={'img-box'}>
            <picture className={''}>
              <img src={construction} alt={t('construction', 'Construction')} />
            </picture>
          </div>
        </div>
      </section>
      <section className={'vehicles'}>
        <div className={'section-contrains'}>
          <p className={'paragraph paragraph--large'}>
            {t('main_paragraph')}
          </p>
          <h2 className={'page-title'}>
            {t('design_quality_safety_price')}
          </h2>
        </div>
        <div className={'list-container'}>
          <div className={'vehicles-list'}>
            <Link className={'vehicle-link'} to="">
              <picture>
                <img src={wheelLoader} alt={t('wheel_loader', 'Wheel Loader')} />
              </picture>
              <p className={'vehicle-name link-title--smaller'}>{t('wheel_loader')}</p>
            </Link>
            <Link className={'vehicle-link'} to="">
              <picture>
                <img src={excavator} alt={t('excavator', 'Excavator')} />
              </picture>
              <p className={'vehicle-name link-title--smaller'}>{t('excavator')}</p>
            </Link>
            <Link className={'vehicle-link'} to="">
              <picture>
                <img src={tractor} alt={t('tractor', 'Tractor')} />
              </picture>
              <p className={'vehicle-name link-title--smaller'}>{t('tractor')}</p>
            </Link>
            <Link className={'vehicle-link'} to="">
              <picture>
                <img src={telescopicHandler} alt={t('telescopic_handler', 'Telescopic Handler')} />
              </picture>
              <p className={'vehicle-name link-title--smaller'}>{t('telescopic_handler')}</p>
            </Link>
            <Link className={'vehicle-link'} to="">
              <picture>
                <img src={skidLoader} alt={t('skid_loader', 'Skid Loader')} />
              </picture>
              <p className={'vehicle-name link-title--smaller'}>{t('skid_loader')}</p>
            </Link>
            <Link className={'vehicle-link'} to="">
              <picture>
                <img src={forkLift} alt={t('fork_lift', 'Fork Lift')} />
              </picture>
              <p className={'vehicle-name link-title--smaller'}>{t('fork_lift')}</p>
            </Link>
          </div>
        </div>
      </section>
      <section className={'section-contrains insta-section'}>
        <InstaFeed url="https://www.instagram.com/se_equipment_poland/?utm_source=ig_embed&ig_rid=78605f56-027c-4390-a0bb-02966f08eda5" />
      </section>
      <section className={'section-contrains'}>
        <div className={'end-of-page'}></div>
      </section>
    </main>
  );
}

export default HomePage;
