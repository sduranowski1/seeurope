import './SidebarComponent.scss';
import { useContext, useState } from "react";
import  AuthContext  from "../../AuthContext";
import  Context  from "../../App";
import { Link } from "react-router-dom";
import { MyCoupling } from "../../Pages/MyCoupling/MyCoupling";
import { MyMachine } from "../../Pages/MyMachine/MyMachine";
import { AboutUs } from "../../Pages/AboutUs/AboutUs";
import { Contact } from "../../Pages/Contact/Contact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faUser, faLock, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {t} from "i18next";

export const SidebarComponent = () => {
    const [toggleSidebar, setToggleSidebar] = useContext(Context);
    const [user, setUser] = useContext(AuthContext);
    const [sidebarFunctionality, setSidebarFunctionality] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    async function onAuthSet(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://se-europe-test.pl/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ username: login, password: password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Response Data:", data);  // Log the actual response data
                localStorage.setItem("authToken", data.token);
                setUser({ name: login, isAuthenticated: true });
                console.log(`${login}: ${true}`);

                if (data.redirect_url) {
                    window.location.href = data.redirect_url;
                } else {
                    toggleFunctionality(false);
                }
            } else {
                const errorData = await response.json();
                console.error("Login failed:", errorData.message);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }



    function toggleFunctionality(value) {
        setSidebarFunctionality(value);
    }

    return (
        <aside className={`${!toggleSidebar ? 'aside-container--hidden' : ''}`}>
            <div className={`aside__subcontainer ${sidebarFunctionality ? 'aside__subcontainer--hidden' : ''}`}>
                <div className={'aside__line-container'}>
                    <div className={'aside__line aside__line--no-bg'}>
                        <h2 className={'section-subtitle'}>Menu</h2>
                        <FontAwesomeIcon className={'btn btn--close'} icon={faCircleXmark} onClick={() => { setToggleSidebar(false) }} />
                    </div>
                </div>
                <div className={`aside__line-container`}>
                    <div className={'aside__line'} onClick={() => toggleFunctionality(true)}>
                        <FontAwesomeIcon className={'sidebar-icon'} icon={faUser} />
                        <p>Logowanie</p>
                    </div>
                </div>
                <div className={'aside__line-container aside__line-container--column'}>
                    <Accordion className={'aside__line aside__line--accordion'}>
                        <AccordionSummary expandIcon={<FontAwesomeIcon className={'angle-up'} icon={faAngleUp} />} aria-controls="panel1-content" id="panel1-header">
                            <Link className={'aside__line aside__line--narrow'} to={'my-coupling'} element={<MyCoupling />}>{t('my-coupling')}</Link>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                <li className="nav__submenu-item ">
                                    <Link to={'/moje-zlacze/3-punkt'}>3 punkt</Link>
                                </li>
                                <li className="nav__submenu-item ">
                                    <Accordion className={'aside__line aside__line--accordion'}>
                                        <AccordionSummary expandIcon={<FontAwesomeIcon className={'angle-up'} icon={faAngleUp} />} aria-controls="panel2-content" id="panel2-header">
                                            <Link className={'aside__line aside__line--narrow'} to={'/my-machine'} element={<MyMachine />}>Atlas</Link>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <ul>
                                                <li className="nav__submenu-item ">
                                                    <Link to={''}>Atlas 35</Link>
                                                </li>
                                                <li className="nav__submenu-item ">
                                                    <Link to={''}>Atlas 95</Link>
                                                </li>
                                            </ul>
                                        </AccordionDetails>
                                    </Accordion>
                                </li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={'aside__line aside__line--accordion'}>
                        <AccordionSummary expandIcon={<FontAwesomeIcon className={'angle-up'} icon={faAngleUp} />} aria-controls="panel2-content" id="panel2-header">
                            <Link className={'aside__line aside__line--narrow'} to={'/my-machine'} element={<MyMachine />}>{t('my-machine')}</Link>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                <li className="nav__submenu-item ">
                                    <Link to={'/moja-maszyna/ladowarka-kolowa'}>Ładowarka kołowa</Link>
                                </li>
                                <li className="nav__submenu-item ">
                                    <Link to={'/moja-maszyna/koparka'}>Koparka</Link>
                                </li>
                                <li className="nav__submenu-item ">
                                    <Link to={'/moja-maszyna/traktor'}>Traktor</Link>
                                </li>
                                <li className="nav__submenu-item ">
                                    <Link to={'/moja-maszyna/ladowarka-teleskopowa'}>Ładowarka teleskopowa</Link>
                                </li>
                                <li className="nav__submenu-item ">
                                    <Link to={'/moja-maszyna/wozek-widlowy'}>Wózek widłowy</Link>
                                </li>
                                <li className="nav__submenu-item ">
                                    <Link to={'/moja-maszyna/bez-zlacz'}>Bez złącz</Link>
                                </li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={'aside__line aside__line--accordion'}>
                        <AccordionSummary expandIcon={<FontAwesomeIcon className={'angle-up'} icon={faAngleUp} />} aria-controls="panel3-content" id="panel3-header">
                            <Link className={'aside__line aside__line--narrow'} to={'/o-nas'} element={<AboutUs />}>O nas</Link>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                <li className="nav__submenu-item ">
                                    <Link to={'/o-nas/kontakt'}>Kontakt</Link>
                                </li>
                                <li className="nav__submenu-item ">
                                    <Link to={'/o-nas/to-jest-se'}>To jest SE</Link>
                                </li>
                                <li className="nav__submenu-item ">
                                    <Link to={'/o-nas/zrownowazony-rozwoj'}>Zrównoważony rozwój</Link>
                                </li>
                                <li className="nav__submenu-item ">
                                    <Link to={'/o-nas/znajdz-posrednika'}>Znajdź pośrednika</Link>
                                </li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className={'aside__line-container aside__line-container--column'}>
                    <Link className={'aside__line'} to={'/'}>Start</Link>
                    <Link className={'aside__line'} to={'/moje-konto/moja-strona'}>Moje konto</Link>
                    <Link className={'aside__line'} to={'/o-nas/kontakt'} element={<Contact />}>Kontakt</Link>
                </div>
            </div>
            <div className={`aside__subcontainer ${sidebarFunctionality ? '' : 'aside__subcontainer--hidden'}`}>
                <div className={'aside__line-container'}>
                    <div className={'aside__line aside__line--no-bg'}>
                        <h2 className={'section-subtitle'}>Logowanie</h2>
                        <FontAwesomeIcon className={'btn btn--close'} icon={faCircleXmark} onClick={() => toggleFunctionality(false)} />
                    </div>
                </div>
                <form className={'form'} onSubmit={onAuthSet}>
                    <div className={'aside__line-container'}>
                        <div className={'aside__line'}>
                            <div>
                                <FontAwesomeIcon className={'sidebar-icon'} icon={faUser} />
                                <label htmlFor={'login'}>Login*:</label>
                            </div>
                            <input required={true} type="text" id={'login'} placeholder={'Wpisz login'} value={login} onChange={(e) => setLogin(e.target.value)} />
                        </div>
                        <div className={'aside__line'}>
                            <div>
                                <FontAwesomeIcon className={'sidebar-icon'} icon={faLock} />
                                <label htmlFor={'password'}>Hasło*:</label>
                            </div>
                            <input required={true} type="password" id={'password'} placeholder={'Wpisz hasło'} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className={'button button--login'} type="submit">Zaloguj</button>
                    </div>
                </form>
            </div>
        </aside>
    );
}
