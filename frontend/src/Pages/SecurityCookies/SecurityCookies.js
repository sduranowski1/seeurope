import './SecurityCookies.scss';

export const SecurityCookies = () => {
    return (
        <main>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container left-orientation'}>
                    <h1 className={'page-title'}>CIASTECZKA I BEZPIECZEŃSTWO</h1>
                    <br />
                    <h2 className={'section-subtitle section-subtitle--secondary-color'}>Cookies</h2>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Podczas logowania używamy unikalnego identyfikatora sesji w pliku cookie, który jest przechowywany na Twoim komputerze.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Ten plik cookie wygasa po około 30 minutach bezczynności lub po wylogowaniu.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Zgodnie z ustawą o komunikacji elektronicznej w UE musimy poinformować Cię, że używamy plików cookie.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Plik cookie to mały plik tekstowy z informacjami przechowywanymi na Twoim komputerze.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Używamy plików cookie wyłącznie ze względów technicznych, aby poprawić funkcjonalność.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        W większości używamy tymczasowych plików cookie, które wygasają automatycznie po każdej sesji, z wyjątkiem sytuacji, gdy używasz funkcji automatycznego logowania, która zapisze mały plik na Twoim komputerze.
                    </p>
                </div>
            </section>
        </main>
    );
}