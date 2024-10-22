import './NewCustomer.scss';

export const NewCustomer = () => {
    return (
        <main>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container left-orientation'}>
                    <h1 className={'page-title'}>JAK ZŁOŻYĆ ZAMÓWIENIE</h1>
                    <p className={'paragraph paragraph--medium'}>
                        Aby móc złożyć zamówienie, musisz być zarejestrowanym klientem.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Możesz łatwo utworzyć konto, kontaktując się z nami pod adresem <a href={'mailto:post@se-europe.com'}>post@se-europe.com</a>.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Do zalogowania się i złożenia zamówienia będziesz potrzebować swojej nazwy użytkownika i hasła.
                    </p>
                </div>
            </section>
        </main>
    );
}