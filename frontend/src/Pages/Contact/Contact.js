import './Contact.scss';
import andrzej from '../../assets/contact/andrzej-a.png';
import anna from '../../assets/contact/anna-ch.png';
import anton from '../../assets/contact/antoni-jablonski.jpg';
import arkadiusz from '../../assets/contact/arkadiusz-g.jpg';
import joanna from '../../assets/contact/joanna-waniolka.jpg';
import marcin from '../../assets/contact/marcin-waniolka.jpg';
import radoslaw from '../../assets/contact/radoslaw-stawowy.jpg';
import zuzanna from '../../assets/contact/zuzanna-b.jpg';

export const Contact = () => {
    return (
        <main className={'contact-page'}>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>SE Equipment Polska</h1>
                </div>
                <div className={'person-cards-container'}>
                    <div className={'person-card'}>
                        <picture>
                            <img src={marcin} />
                        </picture>
                        <div className={'person-card__text-container'}>
                            <h3 className={'paragraph'}>CEO</h3>
                            <p className={'link-title'}>Marcin Waniołka</p>
                            <a href={'mailto:marcin.waniolka@se-europe.com'} >marcin.waniolka@se-europe.com</a>
                            <p className={'paragraph'}>+48 606 424 443</p>
                        </div>
                    </div>
                    <div className={'person-card'}>
                        <picture>
                            <img src={joanna} />
                        </picture>
                        <div className={'person-card__text-container'}>
                            <h3 className={'paragraph'}>Co-Owner / Main Accountant</h3>
                            <p className={'link-title'}>Joanna Waniołka</p>
                            <a className={'paragraph'} href={'mailto:joanna.waniolka@se-europe.com'} >joanna.waniolka@se-europe.com</a>
                            <p className={'paragraph'}>+48 696 382 192</p>
                        </div>
                    </div>
                    <div className={'person-card'}>
                        <picture>
                            <img src={anton} />
                        </picture>
                        <div className={'person-card__text-container'}>
                            <h3 className={'paragraph'}>Sales Manager</h3>
                            <p className={'link-title'}>Antoni Jabłoński</p>
                            <a className={'paragraph'} href={'mailto:antoni.jablonski@se-europe.com'} >antoni.jablonski@se-europe.com</a>
                            <p className={'paragraph'}>+48 696 131 009</p>
                        </div>
                    </div>
                    <div className={'person-card'}>
                        <picture>
                            <img src={radoslaw} />
                        </picture>
                        <div className={'person-card__text-container'}>
                            <h3 className={'paragraph'}>Sales</h3>
                            <p className={'link-title'}>Radosław Stawowy</p>
                            <a className={'paragraph'} href={'mailto:radoslaw.stawowy@se-europe.com'} >radoslaw.stawowy@se-europe.com</a>
                            <p className={'paragraph'}>+48 696 103 140</p>
                        </div>
                    </div>
                    <div className={'person-card'}>
                        <picture>
                            <img src={anna} />
                        </picture>
                        <div className={'person-card__text-container'}>
                            <h3 className={'paragraph'}>Sales support</h3>
                            <p className={'link-title'}>Anna Chęczkiewicz</p>
                            <a className={'paragraph'} href={'mailto:anna.checzkiewicz@se-europe.com'} >anna.checzkiewicz@se-europe.com</a>
                            <p className={'paragraph'}>+48 600 779 335</p>
                        </div>
                    </div>
                    <div className={'person-card'}>
                        <picture>
                            <img src={andrzej} />
                        </picture>
                        <div className={'person-card__text-container'}>
                            <h3 className={'paragraph'}>Sales support</h3>
                            <p className={'link-title'}>Andrzej Adamski</p>
                            <a className={'paragraph'} href={'mailto:andrzej.adamski@se-europe.com'} >andrzej.adamski@se-europe.com</a>
                            <p className={'paragraph'}>+48 696 577 001</p>
                        </div>
                    </div>
                    <div className={'person-card'}>
                        <picture>
                            <img src={zuzanna} />
                        </picture>
                        <div className={'person-card__text-container'}>
                            <h3 className={'paragraph'}>Purchasing manager</h3>
                            <p className={'link-title'}>Zuzanna Bednarek</p>
                            <a className={'paragraph'} href={'mailto:zuzanna.bednarek@se-europe.com'} >zuzanna.bednarek@se-europe.com</a>
                            <p className={'paragraph'}>+48 664 154 787</p>
                        </div>
                    </div>
                    <div className={'person-card'}>
                        <picture>
                            <img src={arkadiusz} />
                        </picture>
                        <div className={'person-card__text-container'}>
                            <h3 className={'paragraph'}>Warehouse</h3>
                            <p className={'link-title'}>Arkadiusz Grzywacz</p>
                            <a className={'paragraph'} href={'mailto:arkadiusz.grzywacz@se-europe.com'}>arkadiusz.grzywacz@se-europe.com</a>
                            <p className={'paragraph'}>+48 662 890 029</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}