import './MyAccount.scss';

export const MyAccount = () => {
    return (
        <main>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container left-orientation'}>
                    <h1 className={'page-title'}>MOJE KONTO</h1>
                    <br />
                    <h2 className={'section-subtitle section-subtitle--secondary-color'}>MOJE SZCZEGÓŁY</h2>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Tutaj możesz zmienić informacje podane podczas rejestracji.
                    </p>
                    <br />
                    <h2 className={'section-subtitle section-subtitle--secondary-color'}>PRZEGLĄD ZAMÓWIEŃ</h2>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Tutaj możesz zobaczyć przegląd swoich poprzednich zamówień.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Klikając na zamówienie uzyskasz więcej informacji na temat konkretnego zamówienia.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Możesz skopiować zamówienie i umieścić je bezpośrednio w kasie.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Jeśli klikniesz na zdjęcie ciężarówki w przeglądzie zamówienia, będziesz mógł śledzić swoje zamówienie online.
                    </p>
                    <br />
                    <h2 className={'section-subtitle section-subtitle--secondary-color'}>SUBSKRYPCJE</h2>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Tutaj możesz zapisać się na dostępne informacje i newslettery. Po prostu użyj pól wyboru, aby zasubskrybować lub anulować subskrypcję, a następnie naciśnij „aktualizuj”.
                    </p>
                    <br />
                    <h2 className={'section-subtitle section-subtitle--secondary-color'}>ULUBIONE</h2>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Po zalogowaniu możesz przeglądać swoje listy ulubionych, dodawać nowe ulubione ze stron produktów i umieszczać całe listy ulubionych lub ich części w koszyku.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        W kasie istnieje możliwość zapisania całego koszyka na liście ulubionych.
                    </p>
                </div>
            </section>
        </main>
    );
}