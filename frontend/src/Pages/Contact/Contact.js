import './Contact.scss';
import andrzej from '../../assets/contact/andrzej-a.png';
import anna from '../../assets/contact/anna-ch.png';
import anton from '../../assets/contact/antoni-jablonski.jpg';
import arkadiusz from '../../assets/contact/arkadiusz-g.jpg';
import joanna from '../../assets/contact/joanna-waniolka.jpg';
import marcin from '../../assets/contact/marcin-waniolka.jpg';
import radoslaw from '../../assets/contact/radoslaw-stawowy.jpg';
import zuzanna from '../../assets/contact/zuzanna-b.jpg';
import p_rychta from '../../assets/contact/p_rychta.jpg';
import n_kaczmarek from '../../assets/contact/n_kaczmarek.jpg';
import j_waniolka from '../../assets/contact/j_waniolka.jpg';
import { useTranslation } from "react-i18next";

export const Contact = () => {
    const { t } = useTranslation();

    const people = [
        {
            title: t('contactPeople.ceo.title'),
            name: "Marcin Waniołka",
            email: "marcin.waniolka@se-europe.com",
            phone: "+48 606 424 443",
            image: marcin
        },
        {
            title: t('contactPeople.coOwner.title'),
            name: "Joanna Waniołka",
            email: "joanna.waniolka@se-europe.com",
            phone: "+48 696 382 192",
            image: j_waniolka
        },
        {
            title: t('contactPeople.salesManager.title'),
            name: "Antoni Jabłoński",
            email: "antoni.jablonski@se-europe.com",
            phone: "+48 696 131 009",
            image: anton
        },
        {
            title: t('contactPeople.sales.title'),
            name: "Radosław Stawowy",
            email: "radoslaw.stawowy@se-europe.com",
            phone: "+48 696 103 140",
            image: radoslaw
        },
        {
            title: t('contactPeople.salesSupport1.title'),
            name: "Anna Chęczkiewicz",
            email: "anna.checzkiewicz@se-europe.com",
            phone: "+48 600 779 335",
            image: anna
        },
        {
            title: t('contactPeople.salesSupport2.title'),
            name: "Andrzej Adamski",
            email: "andrzej.adamski@se-europe.com",
            phone: "+48 696 577 001",
            image: andrzej
        },
        {
            title: t('contactPeople.purchasingManager.title'),
            name: "Paulina Rychta",
            email: "paulina.rychta@se-europe.com",
            phone: "+48 664 154 787",
            image: p_rychta
        },
        {
            title: t('contactPeople.warehouse.title'),
            name: "Arkadiusz Grzywacz",
            email: "arkadiusz.grzywacz@se-europe.com",
            phone: "+48 662 890 029",
            image: arkadiusz
        },
        {
            title: t('contactPeople.sales.title'),
            name: "Natalia Kaczmarek",
            email: "natalia.kaczmarek@se-europe.com",
            phone: "+48 664 779 558",
            image: n_kaczmarek
        }
    ];

    return (
        <main className={'contact-page'}>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>{t('contactPeople.pageTitle')}</h1> {/* Page Title */}
                </div>

                <div className={'person-cards-container'}>
                    {people.map((person, index) => (
                        <div key={index} className={'person-card'}>
                            <picture>
                                <img src={person.image} alt={person.name} />
                            </picture>
                            <div className={'person-card__text-container'}>
                                <h3 className={'paragraph'}>{person.title}</h3> {/* Translated Title */}
                                <p className={'link-title'}>{person.name}</p>
                                <a href={`mailto:${person.email}`}>{person.email}</a>
                                <p className={'paragraph'}>{person.phone}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};
