import React, {useContext, useState} from 'react';
import './SidebarComponent.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faUser, faAngleUp, faLock } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import {Context} from "../../App";
import AuthContext from "../../AuthContext";
import {useTranslationContext} from "../../TranslationContext";

const Sidebar = ({ setToken }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { token } = useContext(AuthContext);

  const [toggleSidebar, setToggleSidebar] = useContext(Context);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('https://127.0.0.1:8000/auth', {
      const response = await fetch('https://se-europe-test.pl/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Błędne hasło lub twoje konto nie jest jeszcze aktywne');
      }

      const data = await response.json();
      setToken(data.token);
      window.location.reload();
      setTimeout(() => {
        console.log("Delayed for 1 second.");
      }, 1000);
      navigate('/dashboard'); // Redirect to dashboard after successful login

    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    // navigate('/'); // Redirect to login page after logout
  };

  const { t, changeLanguage } = useTranslationContext();

  return (
      <aside className={`aside-container ${!toggleSidebar ? 'aside-container--hidden' : ''}`}>
        <div className="aside__subcontainer">
          <div className="aside__line-container">
            {/*<h2 className="section-subtitle p-">Menu</h2>*/}
            {/*/!*<div className="aside__line aside__line--left"/>*!/*/}
            {/*<button className="aside__close" onClick={() => setToggleSidebar(false)}>*/}
            {/*  <FontAwesomeIcon icon={faCircleXmark}/>*/}
            {/*</button>*/}
            <div className="aside__line aside__line--no-bg">
              <h2 className="section-subtitle">Menu</h2>
              <FontAwesomeIcon className="btn btn--close" icon={faCircleXmark} onClick={() => setToggleSidebar(false)} />
            </div>
            {/*<div className="aside__line aside__line--right"/>*/}
          </div>
          {token ? (
              <div className="aside__line-container">
                <div className="aside__line">
                  <FontAwesomeIcon className="sidebar-icon" icon={faUser}/>
                  {/*<p><Link to="/dashboard">Panel użytkownika</Link></p>*/}
                                             <Link to="/logout">{t("logout")}</Link>
                    </div>
                    {/*<div className="aside__line">*/}
                    {/* <p>*/}
                    {/*   <Link to="/logout">{t("logout")}</Link>*/}
                    {/* </p>*/}
                    {/*</div>*/}
                  </div>
              // <div className="aside__line-container">
              //   <div className="aside__line">
              //     <FontAwesomeIcon className="sidebar-icon" icon={faUser}/>
              //     <p><Link to="/logout">Logout</Link></p>
              //   </div>
              // </div>
            ) : (
            <div className="aside__line-container" onClick={toggleLoginForm}>
          <div className="aside__line">
            <FontAwesomeIcon className="sidebar-icon" icon={faUser}/>
            <p>{t('logging_in')}</p>
          </div>
        </div>
        )}
        <div className="aside__line-container aside__line-container--column">
            <Accordion className="aside__line aside__line--accordion">
              <AccordionSummary expandIcon={<FontAwesomeIcon className="angle-up" icon={faAngleUp}/>}
                                aria-controls="panel1-content" id="panel1-header">
                <Link className="aside__line aside__line--narrow" to="moje-zlacze">{t('my_coupling')}</Link>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  <li className="nav__submenu-item ">
                    <Link to="/moje-zlacze/3-punkt">3 punkt</Link>
                  </li>
                  <li className="nav__submenu-item ">
                    <Accordion className="aside__line aside__line--accordion">
                      <AccordionSummary expandIcon={<FontAwesomeIcon className="angle-up" icon={faAngleUp}/>}
                                        aria-controls="panel2-content" id="panel2-header">
                        <Link className="aside__line aside__line--narrow" to="/moja-maszyna">Atlas</Link>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ul>
                          <li className="nav__submenu-item ">
                            <Link to="">Atlas 35</Link>
                          </li>
                          <li className="nav__submenu-item ">
                            <Link to="">Atlas 95</Link>
                          </li>
                        </ul>
                      </AccordionDetails>
                    </Accordion>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion className="aside__line aside__line--accordion">
              <AccordionSummary expandIcon={<FontAwesomeIcon className="angle-up" icon={faAngleUp}/>}
                                aria-controls="panel2-content" id="panel2-header">
                <Link className="aside__line aside__line--narrow" to="/moja-maszyna">{t('my_machine')}</Link>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  <li className="nav__submenu-item ">
                    <Link to="/moja-maszyna/ladowarka-kolowa">{t('wheel_loader')}</Link>
                  </li>
                  <li className="nav__submenu-item ">
                    <Link to="/moja-maszyna/koparka">{t('excavator')}</Link>
                  </li>
                  <li className="nav__submenu-item ">
                    <Link to="/moja-maszyna/traktor">{t('tractor')}</Link>
                  </li>
                  <li className="nav__submenu-item ">
                    <Link to="/moja-maszyna/ladowarka-teleskopowa">{t('telescopic_handler')}</Link>
                  </li>
                  <li className="nav__submenu-item ">
                    <Link to="/moja-maszyna/wozek-widlowy">{t('forklift')}</Link>
                  </li>
                  <li className="nav__submenu-item ">
                    <Link to="/moja-maszyna/bez-zlacz">{t('without_coupling')}</Link>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion className="aside__line aside__line--accordion">
              <AccordionSummary expandIcon={<FontAwesomeIcon className="angle-up" icon={faAngleUp}/>}
                                aria-controls="panel3-content" id="panel3-header">
                <Link className="aside__line aside__line--narrow" to="/o-nas">{t('about_us')}</Link>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  <li className="nav__submenu-item ">
                    <Link to="/o-nas/kontakt">{t('contact')}</Link>
                  </li>
                  <li className="nav__submenu-item ">
                    <Link to="/o-nas/to-jest-se">{t('this_is_se')}</Link>
                  </li>
                  <li className="nav__submenu-item ">
                    <Link to="/o-nas/zrownowazony-rozwoj">{t('sustainability')}</Link>
                  </li>
                  <li className="nav__submenu-item ">
                    <Link to="/o-nas/znajdz-posrednika">{t('find_reseller')}</Link>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="aside__line-container aside__line-container--column">
            <Link className="aside__line" to="/">Start</Link>
            {token ? (            <Link className="aside__line" to="/dashboard">{t('dashboard')}</Link>
) : (<Link className="aside__line" to="/register">{t('contact_us')}</Link>)}

          </div>
        </div>
        {showLoginForm && (
        <div className="aside__subcontainer">
          <div className="aside__line-container">
            <div className="aside__line aside__line--no-bg">
              <h2 className="section-subtitle">{t('login')}</h2>
              <FontAwesomeIcon className="btn btn--close" icon={faCircleXmark} onClick={toggleLoginForm} />
            </div>
          </div>

          {/* Uncomment if needed
          <button className="button button--toggle-login" onClick={toggleLoginForm}>
            {showLoginForm ? t('hide_form') : t('show_form')}
          </button>
          */}

          <form className="form" onSubmit={handleSubmit}>
            <div className="aside__line-container login-pop-up">
              <div className="aside__line">
                <div>
                  <FontAwesomeIcon className="sidebar-icon" icon={faUser} />
                  <label htmlFor="login">{t('login_label')}</label>
                </div>
                <input
                  type="email"
                  id="login"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('enter_login')}
                />
              </div>
              <div className="aside__line">
                <div>
                  <FontAwesomeIcon className="sidebar-icon" icon={faLock} />
                  <label htmlFor="password">{t('password_label')}</label>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('enter_password')}
                />
              </div>
              <button className="button button--login" type="submit">
                {t('login_button')}
              </button>
            </div>
          </form>
        </div>
      )}

      </aside>
  );
};

export default Sidebar;