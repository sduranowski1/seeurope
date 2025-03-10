import {useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../AuthContext";
import {jwtDecode} from "jwt-decode";

export const MyDetails = () => {
    const { token } = useContext(AuthContext); // Get token from AuthContext
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);

    const fetchUser = async () => {
        try {
            if (token) {
                const decodedToken = jwtDecode(token);
                const id = decodedToken?.id;

                if (id) {
                    setUserId(id);

                    const response_user = await fetch(`https://se-europe-test.pl/api/enova_people/${encodeURIComponent(id)}`, {
                        headers: {
                            'Accept': 'application/ld+json'
                        }
                    });

                    const userDataFetched = await response_user.json();
                    console.log(userDataFetched)
                    setUserData(userDataFetched)

                } else {
                    console.error('Email not found in the token');
                }
            } else {
                console.error('Token is missing from AuthContext');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <main>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container left-orientation'}>

                    <h1 className={'page-title'}>ZMIEŃ SWOJE DANE</h1>
                    <br/>
                    <p className={'paragraph paragraph--medium'}>
                        Wypełnij pola, które chcesz zmodyfikować.
                    </p>
                    <br/>
                    <p className={'paragraph paragraph--medium'}>
                        Ogłoszenie!
                        Nie zapomnij zapisać zmian, klikając przycisk Zapisz na dole strony!
                        Czy chcesz dokonać zmian w danych nie ujętych w tym formularzu?

                    </p>
                    <br/>
                    <p className={'paragraph paragraph--medium'}>
                        Skontaktuj się z nami, a chętnie Ci pomożemy.
                    </p>


                    <br/>
                    <h2 className={'page-title'}>Dane firmy</h2>
                    <br/>
                    {userData?.contractor?.nazwa && (
                        <div className={'field-container'}>
                            <label htmlFor={'company_name'}>Firma:</label>
                            {/*<input type="text" id={'company_name'} />*/}
                            <a>{userData?.contractor?.nazwa}</a>
                        </div>
                    )}
                    {/*<div className={'field-container'}>*/}
                    {/*    <label htmlFor={'client_id'}>Id klienta:</label>*/}
                    {/*    <input type="text" id={'client_id'} />*/}
                    {/*</div>*/}
                    {userData?.contractor?.adres?.ulica && (
                        <div className={'field-container'}>

                            <label htmlFor={'company_postal_code'}>Ulica:</label>
                            <a>{userData?.contractor?.adres?.ulica}</a>
                        </div>
                    )}
                    {userData?.contractor?.adres?.nrDomu && (
                        <div className={'field-container'}>

                            <label htmlFor={'company_postal_code'}>Nr Domu:</label>
                            <a>{userData?.contractor?.adres?.nrDomu}</a>
                        </div>
                    )}
                    {userData?.contractor?.adres?.nrLokalu && (
                        <div className={'field-container'}>

                            <label htmlFor={'company_postal_code'}>Nr Lokalu:</label>
                            <a>{userData?.contractor?.adres?.nrLokalu}</a>
                        </div>
                    )}
                    {userData?.contractor?.adres?.kodPocztowy && (
                        <div className={'field-container'}>
                            <label htmlFor={'company_postal_code'}>Kod pocztowy:</label>
                            <a>{userData?.contractor?.adres?.kodPocztowy}</a>
                        </div>
                    )}
                    {userData?.contractor?.adres?.kraj && (
                        <div className={'field-container'}>
                            <label htmlFor={'company_postal_code'}>Kraj:</label>
                            <a>{userData?.contractor?.adres?.kraj}</a>
                        </div>
                    )}
                    <div className={'field-container'}>
                        <label htmlFor={'company_phone_number'}>Numer telefonu:</label>
                        <a>{userData?.telKomorkowy}</a>
                    </div>
                    {/*<div className={'field-container'}>*/}
                    {/*    <label htmlFor={'company_email'}>Numer faksu:</label>*/}
                    {/*    <input type="text" id={'company_email'} />*/}
                    {/*</div>*/}

                    <form className={'form'}>
                        <br/>
                        <h2 className={'page-title'}>Moje dane</h2>
                        <br/>
                        <div className={'field-container'}>
                            <label htmlFor={'first_name'}>Imię*:</label>
                            <input required={true} type="text" id={'first_name'} placeholder={'Wpisz imię'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'last_name'}>Nazwisko*:</label>
                            <input type="text" id={'last_name'} placeholder={'Wpisz nazwisko'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'phone_number'}>Numer telefonu*:</label>
                            <input required={true} type="number" id={'phone_number'}
                                   placeholder={'Wpisz numer telefonu'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'email'}>Email*:</label>
                            <input required={true} type="text" id={'email'} placeholder={'Wpisz email'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'address'}>Adres:</label>
                            <input type="text" id={'address'} placeholder={'Wpisz adres'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'postal_code'}>Kod pocztowy:</label>
                            <input type="text" id={'postal_code'} placeholder={'Wpisz kod pocztowy'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'country'}>Kraj:</label>
                            <input type="text" id={'country'} placeholder={'Wpisz kraj'}/>
                        </div>

                        <br/>
                        <h2 className={'page-title'}>Zmień moje dane do logowania</h2>
                        <br/>
                        <p className={'paragraph paragraph--medium'}>
                            Podaj nowe dane potrzebne do logowania. Aby móc zalogować się następnym razem,
                            pamiętaj o tych nowych szczegółach! Nazwa użytkownika musi zawierać minimum 6 i
                            nie więcej niż 40 znaków, hasło minimum 6 i nie więcej niż 20 znaków.
                        </p>

                        <div className={'field-container'}>
                            <label htmlFor={'login'}>Login:</label>
                            <input type="text" id={'login'} placeholder={'Wpisz login'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'password'}>Hasło:</label>
                            <input type="text" id={'password'} placeholder={'Wpisz hasło'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'confirm_password'}>Potwierdź hasło:</label>
                            <input type="text" id={'confirm_password'} placeholder={'Potwierdź hasło'}/>
                        </div>

                        <input type="submit"/>
                    </form>
                </div>
            </section>
        </main>
    );
}