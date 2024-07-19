import './Sustainability.scss';
import background from '../../assets/sustainability/sustainability.png';

export const Sustainability = () => {
    return (
        <main className={'sustainability-page'}>
            <section className={'section-contrains tables-page'}>
                <div className={'sustainability-container'}>
                    <div className={'bg-shape'} />
                    <picture>
                        <img src={background} />
                    </picture>
                    <div className={'heading-container'}>
                        <h1 className={'page-title'}>ZRÓWNAŻONY ROZWÓJ</h1>
                        <br />
                        <h2 className={'section-subtitle'}>Kodeks postępowania dla dostawców</h2>
                        <p className={'paragraph paragraph--medium'}>
                            SE Equipment dąży do systematycznego rozwijania produktów i usług we współpracy z naszymi
                            dostawcami, budując długotrwałe i trwałe relacje. Staramy się, aby nasze produkty i usługi
                            były produkowane w warunkach zrównoważonych i odpowiedzialnych. W celu zapewnienia
                            odpowiedzialnego zachowania, Kodeks Postępowania Dostawców SE Equipment opisuje wymagania,
                            jakie stawiamy naszym dostawcom. Nasz Kodeks Postępowania podsumowuje, jak powinniśmy
                            działać i podejmować decyzje w codziennej pracy, aby wspólnie wziąć odpowiedzialność za
                            środowisko, społeczeństwo i etykę.
                        </p>
                        <br />
                        <h2 className={'section-subtitle'}>Wartości</h2>
                        <p className={'paragraph paragraph--medium'}>
                            Jako że nasi dostawcy odgrywają znaczącą rolę w naszej działalności, niezwykle ważne jest,
                            aby szanowali i przyjęli te same wartości i poglądy na temat odpowiedzialności korporacyjnej,
                            co my. Nasze wartości stanowią zatem kompas zarówno dla pracowników, jak i dostawców w
                            codziennej pracy.
                        </p>
                        <br />
                        <h2 className={'section-subtitle'}>Otwartość</h2>
                        <br />
                        <h2 className={'section-subtitle'}>Jakość</h2>
                        <br />
                        <h2 className={'section-subtitle'}>Solidarność</h2>
                    </div>
                </div>
            </section>
        </main>
    );
}