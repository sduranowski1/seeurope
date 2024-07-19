import './ThisIsSe.scss';
import video from '../../assets/video/se.mp4';

export const ThisIsSe = () => {
    return (
        <main>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>SE Equipment Polska</h1>
                    <p className={'paragraph paragraph--medium'}>
                        SE Equipment to szwedzka firma założona w 2021 roku, która ambitnie dąży do stania się kompletnym
                        dostawcą sprzętu do wózków widłowych, budownictwa, rolnictwa i manipulacji materiałami.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        W dążeniu do osiągnięcia tego celu, gama produktów jest ciągle poszerzana. Dzięki dużym wolumenom
                        zakupów i skupieniu się na zaspokajaniu popytu rynku na sprzęt i inne osprzęty, udało nam się
                        stworzyć jedno z największych magazynów w Europie.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Nasze bogate doświadczenie i zróżnicowana oferta
                        produktów pozwalają SE Equipment dostarczać spersonalizowane rozwiązania zarówno dla producentów,
                        jak i sprzedawców detalicznych.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Nasza profesjonalna obsługa klienta, konkurencyjne ceny, budowanie silnych relacji i proaktywne
                        podejście pozwoliły nam zdobyć większe udziały w rynku w Szwecji i w całej Europie.
                    </p>
                    <video controls autoPlay muted="true" loop playsInline
                           src={video} type="video/mp4">
                    </video>
                </div>
            </section>
        </main>
    );
}