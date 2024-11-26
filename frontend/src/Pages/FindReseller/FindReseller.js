import './FindReseller.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";

export const FindReseller = () => {
    return (
        <main>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container left-orientation'}>
                    <h1 className={'page-title'}>ZNAJDŹ RESELLERA</h1>
                    <br/>
                    <h2 className={'section-subtitle section-subtitle--secondary-color'}>ZNAJDŹ RESELLERA</h2>
                    <br/>
                    <p className={'paragraph paragraph--medium'}>
                        Użyj poniższego formularza lub wyślij e-mail na adres post@se-europe.com, który zawiera poniższe
                        informacje.
                        Po otrzymaniu Twojego zapytania odpowiemy na podany adres e-mail, przesyłając dane kontaktowe
                        dealera.
                    </p>
                    <br/>
                    <p className={'paragraph paragraph--medium'}>
                        Dziękujemy za Twoje zapytanie!
                    </p>
                    <br/>

                    <p className={'informational'}>
                        <FontAwesomeIcon icon={faCircleInfo}/>
                        Pola oznaczone * są obowiązkowe.
                    </p>


                    <form className={'form'}>
                        <div className={'field-container'}>
                            <label htmlFor={'first_name'}>Imię*:</label>
                            <input required={true} type="text" id={'first_name'} className={"textBox"}
                                   placeholder={'Wpisz imię'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'last_name'}>Nazwisko*:</label>
                            <input type="text" id={'last_name'} className={"textBox"} placeholder={'Wpisz nazwisko'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'company'}>Firma:</label>
                            <input type="text" id={'company'} className={"textBox"} placeholder={'Wpisz firmę'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'address'}>Adres:</label>
                            <input type="text" id={'address'} className={"textBox"} placeholder={'Wpisz adres'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'postal_code'}>Kod pocztowy:</label>
                            <input type="text" id={'postal_code'} className={"textBox"}
                                   placeholder={'Wpisz kod pocztowy'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'country'}>Kraj:</label>
                            <input type="text" id={'country'} className={"textBox"} placeholder={'Wpisz kraj'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'email'}>Email*:</label>
                            <input required={true} type="text" id={'email'} className={"textBox"}
                                   placeholder={'Wpisz email'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'phone_number'}>Numer telefonu*:</label>
                            <input required={true} type="number" id={'phone_number'} className={"textBox"}
                                   placeholder={'Wpisz numer telefonu'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'machine_type'}>Typ maszyny:</label>
                            <input type="text" id={'machine_type'} className={"textBox"}
                                   placeholder={'Wpisz typ maszyny'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'products'}>Zainteresowanie produktami:</label>
                            <input type="text" id={'products'} className={"textBox"}
                                   placeholder={'Wpisz, jakimi produktami się interesujesz'}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'message'}>Wiadomość*:</label>
                            <textarea required={true} placeholder={'Wpisz wiadomość'} id={'message'}
                                      className={"textBox"} className={'message-input'}/>
                        </div>
                        <div className='buttons-container'>
                            <button className='button' type="submit">Wyślij</button>
                            <button className='button button--red'>Reset</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}