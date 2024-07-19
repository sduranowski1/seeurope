import './HowToSearch.scss';

export const HowToSearch = () => {
    return (
        <main>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container left-orientation'}>
                    <p className={'paragraph paragraph--medium'}>
                        W e-commerce wyszukiwanie może odbywać się na kilka sposobów.
                    </p>
                    <br />
                    <h2 className={'section-subtitle section-subtitle--secondary-color'}>NAJPROSTSZE WYSZUKIWANIE</h2>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Najprostsze wyszukiwanie można przeprowadzić bezpośrednio w polu wyszukiwania.
                    </p>
                    <br />
                    <h2 className={'section-subtitle section-subtitle--secondary-color'}>WYSZUKIWANIE FONETYCZNE</h2>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Wyszukiwanie uwzględnia różne warianty pisowni, na przykład Christer i Krister.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Wyniki wyszukiwania, które dokładnie pasują do zapytania, są wyświetlane na górze wyników wyszukiwania.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Jeśli wpiszesz kilka słów kluczowych, oceniane jest każde z nich.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Wynik jest sumowany, aby określić, jak wysoko w wynikach wyszukiwania powinna być wyświetlona dana pozycja.
                    </p>
                    <br />
                    <h2 className={'section-subtitle section-subtitle--secondary-color'}>WYSZUKIWANIE MAŁYMI I DUŻYMI LITERAMI</h2>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Nie ma znaczenia, czy w wyszukiwarce używane są małe czy duże litery.
                    </p>
                </div>
            </section>
        </main>
    );
}