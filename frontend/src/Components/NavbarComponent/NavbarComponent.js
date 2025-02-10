import '../../styles.scss';
import './NavbarComponent.scss';
import seLogo from '../../assets/logos/se-logo.png';
import poland from '../../assets/icons/poland.png';
import germany from '../../assets/icons/germany.png';
import england from '../../assets/icons/england.png';
import {Link, useNavigate} from "react-router-dom";
import HomePage from "../../Pages/HomePage/HomePage";
import React, {useContext, useEffect, useState} from "react";
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
import {faAngleDown, faSpinner} from '@fortawesome/free-solid-svg-icons';
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
import i18n from "i18next";
import AuthContext from "../../AuthContext";
import {Badge, Tooltip} from "@mui/material";
import {useGetList} from "react-admin";

export const NavbarComponent = (props) => {
    const [toggleSidebar, setToggleSidebar] = useContext(Context);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);


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

    const { t, changeLanguage, language } = useTranslationContext();



    const [brands, setBrands] = useState([]);
    const [variants, setVariants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loadingCoupling, setLoadingCoupling] = useState(true);
    const [loadingMachine, setLoadingMachine] = useState(true);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const { token } = useContext(AuthContext);

    // Load cart data from localStorage on component mount
    // useEffect(() => {
    //     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    //     setCartItems(storedCart);
    // }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const brandResponse = await fetch('https://se-europe-test.pl/api/brands?order[name]=asc');
                // const brandResponse = await fetch('https://127.0.0.1:8000/api/brands');
                const brandsData = await brandResponse.json();

                const variantResponse = await fetch('https://se-europe-test.pl/api/variants');
                // const variantResponse = await fetch('https://127.0.0.1:8000/api/variants');
                const variantsData = await variantResponse.json();

                setBrands(brandsData);
                setVariants(variantsData);
                setLoadingCoupling(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoadingCoupling(false);
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
                setLoadingMachine(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoadingMachine(false);
            }
        };

        fetchMachine();
    }, []);

    // if (loading) {
    //     return <div>LoadingComponent...</div>;
    // }

    const renderVariantItems = (brandId) => {
        return variants
            .filter(variant => variant.bid === brandId)
            .map(variant => {
                const variantSlug = variant.variantname.replace(/\s+/g, '_'); // Convert spaces to dashes
                const brandSlug = variant.brand?.name.replace(/\s+/g, '_'); // Convert spaces to dashes


                return (
                    <li key={variant.id}>
                        <Link to={`/my-coupling/${brandSlug}/${variantSlug}`} element={<ThreePoint />}>
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
            const brandSlug = brand.name.replace(/\s+/g, '_'); // Convert spaces to dashes

            return (
                <li key={brand.id} className={`nav__submenu-item ${hasSubItems ? 'nav__submenu-item--list' : ''}`}>
                    <Link
                        to={hasSubItems ? '#' : `/my-coupling/${brandSlug}`} // Use `#` to make it visually consistent but non-functional
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

            const categorySlug = category.name.replace(/\s+/g, '_'); // Convert spaces to dashes

            return (
                <li key={category.id} className={`nav__submenu-item 'nav__submenu-item--list' : ''}`}>
                    <Link
                        to={`/my-machine/${categorySlug}`}>
                        {i18n.language === 'en' ? (
                            category.name
                        ) : i18n.language === 'pl' ? (
                            category.polishName
                        ) : (
                            category.germanName
                        )}
                    </Link>
                </li>
            );
        });
    };

    const handleCartClick = () => {
        navigate('/dashboard/cart'); // Navigate to the cart page
    };

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the cart page
    };

    const handleDashboardClick = () => {
        navigate('/dashboard'); // Navigate to the cart page
    };

    // Function to calculate the cart item count
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartItemCount(itemCount);
        setCartItems(cart);
    };

    // Update cart count on component mount
    useEffect(() => {
        updateCartCount();

        // Listen for the custom event
        const handleCartChange = () => updateCartCount();
        window.addEventListener('cartUpdated', handleCartChange);

        return () => {
            window.removeEventListener('cartUpdated', handleCartChange);
        };
    }, []);


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
                        <div className={"socials"}>
                            <a>
                                <button onClick={() => changeLanguage('en')} className={'icon'} target="_blank">
                                    <img src={england} className={'langs'}/>
                                </button>
                            </a>
                            <a>
                                <button onClick={() => changeLanguage('pl')} className={'icon'} target="_blank">
                                    <img src={poland} className={'langs'}/>
                                </button>
                            </a>
                            <a>
                                <button onClick={() => changeLanguage('de')} className={'icon'} target="_blank">
                                    <img src={germany} className={'langs'}/>
                                </button>
                            </a>
                        </div>
                        <div className={'socials'}>
                            <Link className={'icon'} to={'https://www.facebook.com/SEEquipmentPolandSpzoo/'}
                                  target="_blank">
                                <FontAwesomeIcon icon={faFacebook}/>
                            </Link>
                            <Link className={'icon icon--container'}
                                  to={'https://www.instagram.com/se_equipment_poland/'}
                                  target="_blank">
                                <FontAwesomeIcon icon={faInstagram}/>
                            </Link>
                            <Link className={'icon icon--container'}
                                  to={'https://www.youtube.com/channel/UCyHY8EgVJ5y3sGhjkQuLAvQ'}
                                  target="_blank">
                                <FontAwesomeIcon icon={faYoutube}/>
                            </Link>
                            <Link className={'icon icon--container'} to={'mailto:office-pl@se-europe.com'}
                                  target="_blank">
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
                            <a className={'link-container'} href={'/my-coupling'}>
                                {t('my_coupling')}
                                {loadingCoupling ? (
                                    <div className="loading-spinner">
                                        {/* Replace this with your preferred spinner/loading icon */}
                                        <FontAwesomeIcon icon={faSpinner} spin className={'loading-icon'} />
                                    </div>
                                ) : (
                                    <FontAwesomeIcon icon={faAngleDown} className={'angle-up angle-up--main'} />
                                )}
                            </a>
                            <ul className="nav__submenu">
                                {renderBrandMenuItems()}
                            </ul>
                        </li>
                        <li className="nav__menu-item">
                            <a className={'link-container'}  href={'/my-machine'}>
                                {t('my_machine')}
                                {loadingMachine ? (
                                    <div className="loading-spinner">
                                        {/* Replace this with your preferred spinner/loading icon */}
                                        <FontAwesomeIcon icon={faSpinner} spin className={'loading-icon'} />
                                    </div>
                                ) : (
                                    <FontAwesomeIcon icon={faAngleDown} className={'angle-up angle-up--main'} />
                                )}
                            </a>
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
                            {/*<FontAwesomeIcon className={'sidebar-icon'} icon={faUser}*/}
                            {/*                 onClick={() => setToggleSidebar({sidebar: true})}/>*/}
                            {token ? (
                                <FontAwesomeIcon className={'sidebar-icon'} icon={faUser}
                                                 onClick={handleDashboardClick}/>
                            ) : (
                                <FontAwesomeIcon className={'sidebar-icon'} icon={faUser}
                                                 onClick={handleLoginClick}/>
                            )}
                        </li>
                        <li className={'icon-item'}>
                            {token ? (
                                <div className="cart-container" onClick={handleCartClick} onMouseEnter={handleMouseEnter}
                                     onMouseLeave={handleMouseLeave}>
                                    {cartItemCount > 0 ? (
                                        <>                                    <Tooltip
                                            title={
                                                cartItemCount > 0 ? (
                                                    <div className="cart-tooltip">
                                                        <ul>
                                                            {cartItems.map((item, index) => (
                                                                <li key={index}>
                                                                    <strong>{item.name}</strong> - {item.quantity}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    "Your cart is empty"
                                                )
                                            }
                                            placement="bottom"
                                            arrow
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        bgcolor: 'white',
                                                        color: 'black',
                                                        border: '1px solid #ddd',
                                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                        borderRadius: '8px',
                                                        p: 1,
                                                    },
                                                },
                                            }}
                                        >

                                        <Badge badgeContent={cartItemCount > 0 ? cartItemCount : ''} color="error">
                                                <FontAwesomeIcon className={'sidebar-icon'} icon={faCartShopping} />
                                            </Badge>
                                        </Tooltip>

                                            {/*{isHovered && cartItemCount > 0 && (*/}
                                            {/*    <div className="cart-dropdown">*/}
                                            {/*        <ul>*/}
                                            {/*            {cartItems.map((item, index) => (*/}
                                            {/*                <li key={index}>*/}
                                            {/*                    {item.name} - {item.quantity}*/}
                                            {/*                </li>*/}
                                            {/*            ))}*/}
                                            {/*        </ul>*/}
                                            {/*    </div>*/}
                                            {/*)}*/}
                                        </>
                                    ) : (
                                        <FontAwesomeIcon className="sidebar-icon" icon={faCartShopping} />
                                    )}
                                </div>
                            ) : (
                                <a />
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}