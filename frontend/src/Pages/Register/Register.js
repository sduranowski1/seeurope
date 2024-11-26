import React, { useState } from 'react';
import './Register.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";

export const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        surname: '',
        company: '',
        address: '',
        postal_code: '',
        country: '',
        email: '',
        phone_number: '',
        machine_type: '',
        products: '',
        message: ''
    });

    const [errors, setErrors] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert phone_number to an integer
        const phoneNumber = parseInt(formData.phone_number, 10);
        if (isNaN(phoneNumber)) {
            setErrors({ phone_number: 'Numer telefonu musi być liczbą.' });
            return;
        }

        const user = {
            firstname: formData.firstname,
            surname: formData.surname,
            zip_code: formData.postal_code,
            company: formData.company,
            address: formData.address,
            country: formData.country,
            email: formData.email,
            phone: phoneNumber,
            machine_type: formData.machine_type,
            consdiered_products: formData.products,
            message: formData.message,
            roles: ["ROLE_USER"], // Assuming a default role
            password: "temporaryPassword" // Provide a temporary password if required
        };

        try {
            // const response = await fetch('https://127.0.0.1:8000/api/users', {
            const response = await fetch('https://se-europe-test.pl/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors(errorData);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            setErrors(null); // Clear errors on success
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container left-orientation'}>
                    <h1 className={'page-title'}>WNIOSEK O REJESTRACJĘ</h1>
                    <br/>
                    <h2 className={'section-subtitle section-subtitle--secondary-color'}>WNIOSEK O REJESTRACJĘ</h2>
                    <br/>
                    <p className={'paragraph paragraph--medium'}>
                        Użyj poniższego formularza, który zawiera poniższe informacje.
                        Po otrzymaniu Twojego zapytania odpowiemy na podany adres e-mail, czy spełniasz kryterium.
                    </p>
                    <br/>
                    <p className={'paragraph paragraph--medium'}>
                        Dziękujemy za Twoją aplikacje!
                    </p>
                    <br/>
                    <p className={'informational'}>
                        <FontAwesomeIcon icon={faCircleInfo}/>
                        Pola oznaczone * są obowiązkowe.
                    </p>

                    <form className={'form'} onSubmit={handleSubmit}>
                        <div className={'field-container'}>
                            <label htmlFor={'firstname'}>Imię*:</label>
                            <input required={true} type="text" id={'firstname'} className={"textBox"}
                                   placeholder={'Wpisz imię'} value={formData.firstname} onChange={handleChange}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'surname'}>Nazwisko*:</label>
                            <input required={true} type="text" id={'surname'} className={"textBox"}
                                   placeholder={'Wpisz nazwisko'} value={formData.surname} onChange={handleChange}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'company'}>Firma:</label>
                            <input type="text" id={'company'} className={"textBox"} placeholder={'Wpisz firmę'}
                                   value={formData.company} onChange={handleChange}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'address'}>Adres:</label>
                            <input type="text" id={'address'} className={"textBox"} placeholder={'Wpisz adres'}
                                   value={formData.address} onChange={handleChange}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'postal_code'}>Kod pocztowy:</label>
                            <input type="text" id={'postal_code'} placeholder={'Wpisz kod pocztowy'}
                                   className={"textBox"} value={formData.postal_code} onChange={handleChange}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'country'}>Kraj:</label>
                            <input type="text" id={'country'} className={"textBox"} placeholder={'Wpisz kraj'}
                                   value={formData.country} onChange={handleChange}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'email'}>Email*:</label>
                            <input required={true} type="email" id={'email'} className={"textBox"}
                                   placeholder={'Wpisz email'} value={formData.email} onChange={handleChange}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'phone_number'}>Numer telefonu*:</label>
                            <input required={true} type="number" id={'phone_number'} className={"textBox"}
                                   placeholder={'Wpisz numer telefonu'} value={formData.phone_number}
                                   onChange={handleChange}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'machine_type'}>Typ maszyny:</label>
                            <input type="text" id={'machine_type'} className={"textBox"}
                                   placeholder={'Wpisz typ maszyny'} value={formData.machine_type}
                                   onChange={handleChange}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'products'}>Zainteresowanie produktami:</label>
                            <input type="text" id={'products'} className={"textBox"}
                                   placeholder={'Wpisz, jakimi produktami się interesujesz'} value={formData.products}
                                   onChange={handleChange}/>
                        </div>
                        <div className={'field-container'}>
                            <label htmlFor={'message'}>Wiadomość*:</label>
                            <textarea required={true} placeholder={'Wpisz wiadomość'} id={'message'}
                                      className={'message-input'} value={formData.message}
                                      onChange={handleChange}></textarea>
                        </div>
                        <div className='buttons-container'>
                            <button className='button' type="submit">Wyślij</button>
                            <button className='button button--red'>Reset</button>
                        </div>
                    </form>

                    {errors && <div className="error-messages">
                        <h3>Błędy formularza:</h3>
                        <ul>
                            {Object.entries(errors).map(([field, error]) => (
                                <li key={field}>{`${field}: ${error}`}</li>
                            ))}
                        </ul>
                    </div>}
                </div>
            </section>
        </main>
    );
};
