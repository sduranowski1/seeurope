import {useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../AuthContext";
import {jwtDecode} from "jwt-decode";

export const MyDetails = () => {
    const { token } = useContext(AuthContext); // Get token from AuthContext
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(""); // Success or error message

    const fetchUser = async () => {
        try {
            if (token) {
                const decodedToken = jwtDecode(token);
                const id = decodedToken?.id;

                if (id) {
                    setUserId(id);

                    // const response_user = await fetch(`https://seequipment.pl/api/enova_people/${encodeURIComponent(id)}`, {
                    const response_user = await fetch(`https://seequipment.pl/api/test_enova_contact_peoples/by_uuid?uuid=${encodeURIComponent(id)}`, {
                        method: 'GET', // Explicitly using GET method (this is the default, but it's good to clarify)
                        headers: {
                            'Accept': 'application/json'
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

    const validateForm = () => {
        if (password.length < 6 || password.length > 20) {
            setMessage("Hasło musi mieć od 6 do 20 znaków.");
            return false;
        }
        if (password !== confirmPassword) {
            setMessage("Hasła nie pasują do siebie.");
            return false;
        }
        setMessage(""); // Clear previous messages if validation passes
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await fetch(`https://seequipment.pl/api/user_enovas/${encodeURIComponent(userId)}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/merge-patch+json",
                    "Authorization": `Bearer ${token}`, // Ensure you include the token for authentication
                },
                body: JSON.stringify({ plainPassword: password }),
            });

            if (!response.ok) {
                throw new Error("Nie udało się zaktualizować hasła.");
            }

            setMessage("✅ Hasło zostało pomyślnie zaktualizowane!");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            setMessage("❌ Wystąpił błąd podczas aktualizacji hasła.");
        } finally {
            setLoading(false);
        }
    };

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
                    {userData?.telKomorkowy && (

                        <div className={'field-container'}>
                            <label htmlFor={'company_phone_number'}>Numer telefonu:</label>
                            <a>{userData?.contractor?.Telefon}</a>
                        </div>
                    )}

                    {/*<div className={'field-container'}>*/}
                    {/*    <label htmlFor={'company_email'}>Numer faksu:</label>*/}
                    {/*    <input type="text" id={'company_email'} />*/}
                    {/*</div>*/}

                    <br/>
                    <br/>
                    <h2 className={'page-title'}>Moje dane</h2>
                    <br/>
                    {userData?.imie && (

                        <div className={'field-container'}>
                            <label htmlFor={'first_name'}>Imię:</label>
                            <a>{userData?.imie}</a>
                        </div>
                    )}
                    {userData?.nazwisko && (

                        <div className={'field-container'}>
                            <label htmlFor={'last_name'}>Nazwisko:</label>
                            <a>{userData?.nazwisko}</a>
                        </div>
                    )}
                    {userData?.telKomorkowy && (

                        <div className={'field-container'}>
                            <label htmlFor={'phone_number'}>Numer telefonu:</label>
                            <a>{userData?.telKomorkowy}</a>
                        </div>
                    )}
                    {/*<div className={'field-container'}>*/}
                    {/*    <label htmlFor={'first_name'}>Imię*:</label>*/}
                    {/*    <input required={true} type="text" id={'first_name'} placeholder={'Wpisz imię'}/>*/}
                    {/*</div>*/}
                    {/*<div className={'field-container'}>*/}
                    {/*    <label htmlFor={'last_name'}>Nazwisko*:</label>*/}
                    {/*    <input type="text" id={'last_name'} placeholder={'Wpisz nazwisko'}/>*/}
                    {/*</div>*/}
                    {/*<div className={'field-container'}>*/}
                    {/*    <label htmlFor={'phone_number'}>Numer telefonu*:</label>*/}
                    {/*    <input required={true} type="number" id={'phone_number'}*/}
                    {/*           placeholder={'Wpisz numer telefonu'}/>*/}
                    {/*</div>*/}
                    {userData?.email && (

                        <div className={'field-container'}>
                            <label htmlFor={'email'}>Email:</label>
                            <a>{userData?.email}</a>
                        </div>
                    )}
                    {/*<div className={'field-container'}>*/}
                    {/*    <label htmlFor={'email'}>Email*:</label>*/}
                    {/*    <input required={true} type="text" id={'email'} placeholder={'Wpisz email'}/>*/}
                    {/*</div>*/}
                    {/*<div className={'field-container'}>*/}
                    {/*    <label htmlFor={'address'}>Adres:</label>*/}
                    {/*    <input type="text" id={'address'} placeholder={'Wpisz adres'}/>*/}
                    {/*</div>*/}
                    {/*<div className={'field-container'}>*/}
                    {/*    <label htmlFor={'postal_code'}>Kod pocztowy:</label>*/}
                    {/*    <input type="text" id={'postal_code'} placeholder={'Wpisz kod pocztowy'}/>*/}
                    {/*</div>*/}
                    {/*<div className={'field-container'}>*/}
                    {/*    <label htmlFor={'country'}>Kraj:</label>*/}
                    {/*    <input type="text" id={'country'} placeholder={'Wpisz kraj'}/>*/}
                    {/*</div>*/}

                    <br/>
                    <br/>
                    <form onSubmit={handleSubmit}>

                        <h2 className={'page-title'}>Zmień moje dane do logowania</h2>
                        <br/>
                        <p className={'paragraph paragraph--medium'}>
                            Podaj nowe dane potrzebne do logowania. Aby móc zalogować się następnym razem,
                            pamiętaj o tych nowych szczegółach! Nazwa użytkownika musi zawierać minimum 6 i
                            nie więcej niż 40 znaków, hasło minimum 6 i nie więcej niż 20 znaków.
                        </p>
                        <br/>

                        {/*<div className={'field-container'}>*/}
                        {/*    <label htmlFor={'login'}>Login:</label>*/}
                        {/*    <input type="text" id={'login'} placeholder={'Wpisz login'}/>*/}
                        {/*</div>*/}
                        <div className="field-container">
                            <label htmlFor="password">Hasło:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Wpisz hasło"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="field-container">
                            <label htmlFor="confirm_password">Potwierdź hasło:</label>
                            <input
                                type="password"
                                id="confirm_password"
                                placeholder="Potwierdź hasło"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Success/Error Message */}
                        {message && (
                            <p style={{ color: message.startsWith("✅") ? "green" : "red", fontSize: "14px", marginTop: "10px" }}>
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                backgroundColor: "#1d6cc1", // Green background
                                color: "white", // White text color
                                padding: "10px 20px", // Padding around the text
                                border: "none", // No border
                                borderRadius: "5px", // Rounded corners
                                cursor: loading ? "not-allowed" : "pointer", // Change cursor on loading
                                fontSize: "16px", // Font size
                                fontWeight: "bold", // Bold text
                                marginTop: "20px"
                            }}
                        >
                            {loading ? "Aktualizowanie..." : "Zapisz zmiany"}
                        </button>

                    </form>
                </div>
            </section>
        </main>
    );
}