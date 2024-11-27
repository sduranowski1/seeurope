import '../../styles.scss';
import './NavbarComponent.scss';
import seLogo from '../../assets/logos/se-logo.png';
import poland from '../../assets/icons/poland.png';
import england from '../../assets/icons/england.png';
import {Link} from "react-router-dom";
import HomePage from "../../Pages/HomePage/HomePage";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../App";
import {ThreePoint} from "../../Pages/ThreePoint/ThreePoint";
import {Excavator} from "../../Pages/Excavator/Excavator";
import {Tractor} from "../../Pages/Tractor/Tractor";
import {WheelLoader} from "../../Pages/WheelLoader/WheelLoader";
import {TelescopicHandler} from "../../Pages/TelescopicHandler/TelescopicHandler";
import {Forklift} from "../../Pages/Forklift/Forklift";
import {WithoutCoupling} from "../../Pages/WithoutCoupling/WithoutCoupling";
import {Contact} from "../../Pages/Contact/Contact";
import {ThisIsSe} from "../../Pages/ThisIsSe/ThisIsSe";
import {Sustainability} from "../../Pages/Sustainability/Sustainability";
import {FindReseller} from "../../Pages/FindReseller/FindReseller";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faAngleUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";
import {useTranslationContext} from "../../TranslationContext";
import dataProvider from "../../dataProvider";
import {useProducts} from "../../ProductProvider";

export const NavbarComponent = (props) => {
    const [toggleSidebar, setToggleSidebar] = useContext(Context);

    let lastScrollTop = 0;

    const toggleNavbar = () => {
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;

        const navBarContent = document.querySelector('.nav-bar__content');

        scrollY > lastScrollTop ? navBarContent.classList.remove('visible')  : navBarContent.classList.add('visible');

        lastScrollTop = scrollY <= 0 ? 0 : scrollY;
    }

    window.addEventListener("scroll", toggleNavbar);

    const myCouplingSubmenu = [
        {linkName: '3 punkt', url: '/moje-zlacze/3-punkt'},
    ];



    const aboutUsSubmenu = [
        {linkName: 'Kontakt', url: '/o-nas/kontakt'},
        {linkName: 'To jest se', url: '/o-nas/to-jest-se'},
        {linkName: 'Zrównoważony rozwój', url: '/o-nas/zrownowazony-rozwoj'},
        {linkName: 'Znajdź pośrednika', url: '/o-nas/znajdz-posrednika'},
    ];

    const { t, changeLanguage } = useTranslationContext();



    const [brands, setBrands] = useState([]);
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const brandResponse = await fetch('https://se-europe-test.pl/api/brands');
                // const brandResponse = await fetch('https://127.0.0.1:8000/api/brands');
                const brandsData = await brandResponse.json();

                const variantResponse = await fetch('https://se-europe-test.pl/api/variants');
                // const variantResponse = await fetch('https://127.0.0.1:8000/api/variants');
                const variantsData = await variantResponse.json();

                setBrands(brandsData);
                setVariants(variantsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const renderVariantItems = (brandId) => {
        return variants
            .filter(variant => variant.bid === brandId)
            .map(variant => (
                <li key={variant.id}>
                    <Link to={`/moje-zlacze/${variant.variantname}`} element={<ThreePoint />}>
                        {variant.variantname}
                    </Link>
                </li>
            ));
    };

    const renderBrandMenuItems = () => {
        return brands.map(brand => {
            const variantItems = renderVariantItems(brand.id);
            const hasSubItems = variantItems.length > 0;

            return (
                <li key={brand.id} className={`nav__submenu-item ${hasSubItems ? 'nav__submenu-item--list' : ''}`}>
                    <Link to={`/moje-zlacze/${brand.name}`} element={<ThreePoint />}>
                        {brand.name}
                        {hasSubItems && <FontAwesomeIcon icon={faAngleDown} className={'angle-up'} />}
                    </Link>
                    {hasSubItems && <ul>{variantItems}</ul>}
                </li>
            );
        });
    };




    return (
        <nav className={'nav '} dataProvider={dataProvider}>
            <div className={'nav-bar__content visible'}>
                {/*<div className={'nav--top section-contrains'}>*/}
                <div className={'nav--top'}>
                    <Link to={'/'} element={<HomePage />}>
                        <picture className={'se-logo'}>
                            <img src={seLogo} alt={'SE Europe logo'} />
                        </picture>
                    </Link>
                    <div className={'icons-container'}>
                        <div>
                            <button onClick={() => changeLanguage('en')} className={'icon'} target="_blank">
                                <img src={england} className={'langs'}/>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => changeLanguage('pl')} className={'icon'} target="_blank">
                                <img src={poland} className={'langs'}/>
                            </button>
                        </div>
                        <div className={'socials'}>
                            <Link className={'icon'} to={'https://www.facebook.com/SEEquipmentPolandSpzoo/'}
                                  target="_blank">
                                <FontAwesomeIcon icon={faFacebook}/>
                            </Link>
                            <Link className={'icon icon--container'} to={'https://www.instagram.com/se_equipment_poland/'}
                                  target="_blank">
                                <FontAwesomeIcon icon={faInstagram}/>
                            </Link>
                            <Link className={'icon icon--container'} to={'https://www.youtube.com/channel/UCyHY8EgVJ5y3sGhjkQuLAvQ'}
                                  target="_blank">
                                <FontAwesomeIcon icon={faYoutube}/>
                            </Link>
                            <Link className={'icon icon--container'} to={'mailto:office-pl@se-europe.com'} target="_blank">
                                <FontAwesomeIcon icon={faEnvelope}/>
                            </Link>
                        </div>
                        <div className={'sidebar-toggle'}>
                            <button className={'icon'} onClick={() => setToggleSidebar(!toggleSidebar)}>
                                <FontAwesomeIcon icon={faBars}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={'nav--bottom text-shadow'}>

                    <ul className="nav__menu">
                        <li className="nav__menu-item">
                            <a className={'link-container'}>
                                {t('my_coupling')}
                                <FontAwesomeIcon icon={faAngleDown} className={'angle-up angle-up--main'}/> </a>
                            {/*<ul className="nav__submenu">*/}
                            {/*    <li className="nav__submenu-item ">*/}
                            {/*        <Link to={'/moje-zlacze/3-punkt'} element={<ThreePoint/>}>3 punkt</Link>*/}
                            {/*    </li>*/}
                            {/*    <li className="nav__submenu-item nav__submenu-item--list">*/}
                            {/*        <Link to={'/moje-zlacze/avant'} element={<ThreePoint/>}>*/}
                            {/*            Avant*/}
                            {/*            <FontAwesomeIcon icon={faAngleUp} className={'angle-up'}/>*/}
                            {/*        </Link>*/}
                            {/*        <ul>*/}
                            {/*            <li>*/}
                            {/*                <Link to={'/moje-zlacze/avant-200'} element={<ThreePoint/>}>Avant 200</Link>*/}
                            {/*            </li>*/}
                            {/*            <li>*/}
                            {/*                <Link to={'/moje-zlacze/avant-multione'} element={<ThreePoint/>}>Avant*/}
                            {/*                    Multione</Link>*/}
                            {/*            </li>*/}
                            {/*        </ul>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                            <ul className="nav__submenu">
                                {/*{props.products.map((el,key) => Array.isArray(el) ?*/}


                                {/*            <li key={key} className="nav__submenu-item nav__submenu-item--list">*/}
                                {/*                <Link to={`/moje-zlacze/${el[0].couplings[0]}`} element={<ThreePoint />}>*/}
                                {/*                    {el[0].couplings[1]}*/}
                                {/*                    <FontAwesomeIcon icon={faAngleDown} className={'angle-up'} />*/}
                                {/*                </Link>*/}
                                {/*                <ul>*/}
                                {/*                    {el.map((elem,key) => <li key={key}><Link to={`/moje-zlacze/${elem.url}`}> {elem.name}</Link></li>)}*/}
                                {/*                </ul>*/}
                                {/*            </li>*/}


                                {/*    :*/}

                                {/*        <li key={key} className="nav__submenu-item ">*/}
                                {/*            <Link to={`/moje-zlacze/${el.url}`}>{el.name}</Link>*/}
                                {/*        </li>*/}

                                {/*)}*/}
                                {renderBrandMenuItems()}

                            </ul>
                        </li>
                        <li className="nav__menu-item">
                            <a className={'link-container'}>
                                {t('my_machine')}
                                <FontAwesomeIcon icon={faAngleDown} className={'angle-up angle-up--main'}/>
                            </a>
                            <ul className="nav__submenu">
                                <li className="nav__submenu-item">
                                    <Link to={'/moja-maszyna/ladowarka-kolowa'}
                                          element={<WheelLoader/>}>{t('wheel_loader')}</Link>
                                </li>
                                <li className="nav__submenu-item">
                                    <Link to={'/moja-maszyna/koparka'} element={<Excavator/>}>{t('excavator')}</Link>
                                </li>
                                <li className="nav__submenu-item">
                                    <Link to={'/moja-maszyna/traktor'} element={<Tractor/>}>{t('tractor')}</Link>
                                </li>
                                <li className="nav__submenu-item">
                                    <Link to={'/moja-maszyna/ladowarka-teleskopowa'}
                                          element={<TelescopicHandler/>}>{t('telescopic_handler')}</Link>
                                </li>
                                <li className="nav__submenu-item">
                                    <Link to={'/moja-maszyna/forklift'}
                                          element={<Forklift/>}>{t('forklift')}</Link>
                                </li>
                                <li className="nav__submenu-item">
                                    <Link to={'/moja-maszyna/bez-zlacz'}
                                          element={<WithoutCoupling/>}>{t('without_coupling')}</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav__menu-item">
                            <a className={'link-container'}>
                                {t('about_us')}
                                <FontAwesomeIcon icon={faAngleDown} className={'angle-up angle-up--main'}/>
                            </a>
                            <ul className="nav__submenu">
                                <li className="nav__submenu-item">
                                    <Link to={'/o-nas/kontakt'} element={<Contact/>}>{t('contact')}</Link>
                                </li>
                                <li className="nav__submenu-item">
                                    <Link to={'/o-nas/to-jest-se'} element={<ThisIsSe/>}>{t('this_is_se')}</Link>
                                </li>
                                <li className="nav__submenu-item">
                                    <Link to={'/o-nas/zrownowazony-rozwoj'}
                                          element={<Sustainability/>}>{t('sustainability')}</Link>
                                </li>
                                <li className="nav__submenu-item">
                                    <Link to={'/o-nas/znajdz-posrednika'}
                                          element={<FindReseller/>}>{t('find_reseller')}</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={'icon-item'}>
                            <FontAwesomeIcon className={'sidebar-icon'} icon={faUser}
                                             onClick={() => setToggleSidebar({sidebar: true})}/>
                        </li>
                        <li className={'icon-item'}>
                            <FontAwesomeIcon className={'sidebar-icon'} icon={faCartShopping}
                                             onClick={() => setToggleSidebar({cartSidebar: true})}/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}