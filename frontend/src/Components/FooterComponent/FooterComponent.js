import React from 'react';
import '../../styles.scss';
import './FooterComponent.scss';
import headset from '../../assets/icons/headset.png';
import clock from '../../assets/icons/clock.png';
import home from '../../assets/icons/home.png';
import bgShape from '../../assets/footer/footer-shape.png';
import { Link } from "react-router-dom";
import { NewCustomer } from "../../Pages/NewCustomer/NewCustomer";
import { MyAccount } from "../../Pages/MyAccount/MyAccount";
import { HowToSearch } from "../../Pages/HowToSearch/HowToSearch";
import { HowToShop } from "../../Pages/HowToShop/HowToShop";
import { SecurityCookies } from "../../Pages/SecurityCookies/SecurityCookies";
import { Delivery } from "../../Pages/Delivery/Delivery";
import { useTranslation } from 'react-i18next';
import PrivacyPolicy from "../../Pages/PrivacyPolicy/PrivacyPolicy";

export const FooterComponent = () => {
  const { t } = useTranslation();

  return (
    <footer className={'text-shadow'}>
      <div className={'bg-shape'}>
        <picture>
          <img src={bgShape} alt={t('background_shape', 'A shape in background')} />
        </picture>
      </div>
      <div className={'footer-container section-contrains'}>
        <div className={'subsection__container'}>
          <picture className={'footer-icon'}>
            <img src={headset} alt={t('headset_icon', 'headset icon')} />
          </picture>
          <h3>{t('contact_information')}</h3>
          <div className={'subsection__content'}>
            <p>{t('company_name')}</p>
            <p>{t('address')}</p>
            <p>{t('vat_number')}</p>
          </div>
          <div className={'subsection__content'}>
            <p>{t('phone')}</p>
            <Link to={'mailto:office-pl@se-europe.com'}>office-pl@se-europe.com</Link>
          </div>
        </div>
        <div className={'subsection__container'}>
          <picture className={'footer-icon'}>
            <img src={clock} alt={t('clock_icon', 'clock icon')} />
          </picture>
          <h3>{t('opening_hours')}</h3>
          <div className={'subsection__content'}>
            <p>{t('office_hours')}</p>
            <p>{t('office_days')}</p>
          </div>
        </div>
        <div className={'subsection__container'}>
          <picture className={'footer-icon'}>
            <img src={home} alt={t('home_icon', 'home icon')} />
          </picture>
          <h3>{t('help')}</h3>
          <div className={'subsection__content'}>
            <Link to={'/pomoc-nowy-klient'} element={<NewCustomer />}>{t('new_customer')}</Link>
            <Link to={'/pomoc-jak-zamawiac'} element={<HowToShop />}>{t('how_to_shop')}</Link>
            <Link to={'/pomoc-jak-szukac'} element={<HowToSearch />}>{t('how_to_search')}</Link>
            <Link to={'/pomoc-moje-konto'} element={<MyAccount />}>{t('my_account')}</Link>
            <Link to={'/pomoc-dostawa'} element={<Delivery />}>{t('delivery')}</Link>
            <Link to={'/pomoc-bezpieczenstwo-cookies'} element={<SecurityCookies />}>{t('security_cookies')}</Link>
            <Link to={'/privacy-policy'} element={<PrivacyPolicy />}>RODO</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
