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
    const [categories, setCategories] = useState([]);
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

    useEffect(() => {
        const fetchMachine = async () => {
            try {
                const categoryResponse = await fetch('https://se-europe-test.pl/api/categories');
                const categoriesData = await categoryResponse.json();

                setCategories(categoriesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchMachine();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const renderVariantItems = (brandId) => {
        return variants
            .filter(variant => variant.bid === brandId)
            .map(variant => {
                const variantSlug = variant.variantname.replace(/\s+/g, '-'); // Convert spaces to dashes
                const brandSlug = variant.brand?.name.replace(/\s+/g, '-'); // Convert spaces to dashes


                return (
                    <li key={variant.id}>
                        <Link to={`/moje-zlacze/${brandSlug}/${variantSlug}`} element={<ThreePoint />}>
                            {variant.variantname}
                        </Link>
                    </li>
                );
            });
    };

    const renderBrandMenuItems = () => {
        return brands.map((brand) => {
            const variantItems = renderVariantItems(brand.id);
            const hasSubItems = variantItems.length > 0;

            // Replace spaces with dashes in the brand name
            const brandSlug = brand.name.replace(/\s+/g, '-'); // Convert spaces to dashes

            return (
                <li key={brand.id} className={`nav__submenu-item ${hasSubItems ? 'nav__submenu-item--list' : ''}`}>
                    <Link
                        to={hasSubItems ? '#' : `/moje-zlacze/${brandSlug}`} // Use `#` to make it visually consistent but non-functional
                        element={<ThreePoint />}
                        onClick={(e) => {
                            if (hasSubItems) e.preventDefault(); // Prevent navigation if the brand has variants
                        }}
                    >
                        {brand.name}
                        {hasSubItems && <FontAwesomeIcon icon={faAngleDown} className={'angle-up'} />}
                    </Link>
                    {hasSubItems && <ul>{variantItems}</ul>}
                </li>
            );
        });
    };



    const renderCategoryMenuItems = () => {
        return categories.map(category => {
            return (
                <li key={category.id} className={`nav__submenu-item 'nav__submenu-item--list' : ''}`}>
                    <Link to={`/moja-maszyna/${category.name}`}>
                        {category.name}
                    </Link>
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
                            <a className={'link-container'} href={'/moje-zlacze'}>
                                {t('my_coupling')}
                                <FontAwesomeIcon icon={faAngleDown} className={'angle-up angle-up--main'}/> </a>
                            <ul className="nav__submenu">
                                {renderBrandMenuItems()}
                            </ul>
                        </li>
                        <li className="nav__menu-item">
                            <a className={'link-container'}  href={'/moja-maszyna'}>
                                {t('my_machine')}
                                <FontAwesomeIcon icon={faAngleDown} className={'angle-up angle-up--main'}/> </a>
                            <ul className="nav__submenu">
                                {renderCategoryMenuItems()}
                            </ul>
                        </li>
                        {/*<li className="nav__menu-item">*/}
                        {/*    <a className={'link-container'}>*/}
                        {/*        {t('my_machine')}*/}
                        {/*        <FontAwesomeIcon icon={faAngleDown} className={'angle-up angle-up--main'}/>*/}
                        {/*    </a>*/}
                        {/*    <ul className="nav__submenu">*/}
                        {/*        <li className="nav__submenu-item">*/}
                        {/*            <Link to={'/moja-maszyna/ladowarka-kolowa'}*/}
                        {/*                  element={<WheelLoader/>}>{t('wheel_loader')}</Link>*/}
                        {/*        </li>*/}
                        {/*        <li className="nav__submenu-item">*/}
                        {/*            <Link to={'/moja-maszyna/koparka'} element={<Excavator/>}>{t('excavator')}</Link>*/}
                        {/*        </li>*/}
                        {/*        <li className="nav__submenu-item">*/}
                        {/*            <Link to={'/moja-maszyna/traktor'} element={<Tractor/>}>{t('tractor')}</Link>*/}
                        {/*        </li>*/}
                        {/*        <li className="nav__submenu-item">*/}
                        {/*            <Link to={'/moja-maszyna/ladowarka-teleskopowa'}*/}
                        {/*                  element={<TelescopicHandler/>}>{t('telescopic_handler')}</Link>*/}
                        {/*        </li>*/}
                        {/*        <li className="nav__submenu-item">*/}
                        {/*            <Link to={'/moja-maszyna/forklift'}*/}
                        {/*                  element={<Category/>}>{t('forklift')}</Link>*/}
                        {/*        </li>*/}
                        {/*        <li className="nav__submenu-item">*/}
                        {/*            <Link to={'/moja-maszyna/bez-zlacz'}*/}
                        {/*                  element={<WithoutCoupling/>}>{t('without_coupling')}</Link>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</li>*/}
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