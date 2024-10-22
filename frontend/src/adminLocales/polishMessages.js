// polishMessages.js
const polishMessages = {
    ra: {
        action: {
            delete: 'Usuń',
            show: 'Pokaż',
            list: 'Lista',
            save: 'Zapisz',
            create: 'Utwórz',
            edit: 'Edytuj',
            export: 'Eksportuj',
            sort: 'Sortuj',
            cancel: 'Anuluj',
            undo: 'Cofnij',
            refresh: 'Odśwież',
            add_filter: 'Dodaj filtr',
            remove_filter: 'Usuń filtr',
            back: 'Wstecz',
            bulk_actions: '1 wybrany |||| %{smart_count} wybrane',
            toggle_theme: 'Zmień motyw'
        },
        boolean: {
            true: 'Tak',
            false: 'Nie',
        },
        page: {
            list: '%{name}',
            edit: '%{name} #%{id}',
            show: '%{name} #%{id}',
            create: 'Utwórz %{name}',
            dashboard: 'Pulpit',
            not_found: 'Nie znaleziono',
            loading: 'Ładowanie',
        },
        input: {
            file: {
                upload_several: 'Przeciągnij pliki tutaj lub kliknij, aby je wybrać.',
                upload_single: 'Przeciągnij plik tutaj lub kliknij, aby go wybrać.',
            },
            image: {
                upload_several: 'Przeciągnij obrazy tutaj lub kliknij, aby je wybrać.',
                upload_single: 'Przeciągnij obraz tutaj lub kliknij, aby go wybrać.',
            },
            references: {
                all_missing: 'Nie można znaleźć danych referencyjnych.',
                many_missing: 'Przynajmniej jedna z powiązanych referencji nie jest dostępna.',
                single_missing: 'Powiązana referencja nie jest dostępna.',
            },
        },
        message: {
            yes: 'Tak',
            no: 'Nie',
            are_you_sure: 'Czy jesteś pewien?',
            about: 'O',
            not_found: 'Nie znaleziono strony.',
            loading: 'Trwa ładowanie, proszę czekać.',
            invalid_form: 'Formularz jest niepoprawny. Proszę sprawdzić błędy.',
            delete_title: 'Usuń %{name} #%{id}',
            details: 'Szczegóły',
            error: 'Wystąpił błąd.',
        },
        navigation: {
            no_results: 'Nie znaleziono wyników.',
            page_out_of_boundaries: 'Numer strony %{page} jest poza zakresem',
            page_out_from_end: 'Nie można przejść za ostatnią stronę',
            page_out_from_begin: 'Nie można przejść przed pierwszą stronę',
            page_rows_per_page: 'Ilość wierszy na jednej stronie',
            page_range_info: '%{offsetBegin}-%{offsetEnd} z %{total}',
            next: 'Następna',
            prev: 'Poprzednia',
        },
        auth: {
            username: 'Nazwa użytkownika',
            password: 'Hasło',
            sign_in: 'Zaloguj się',
            sign_in_error: 'Uwierzytelnienie nie powiodło się, spróbuj ponownie.',
            logout: 'Wyloguj się',
        },
        notification: {
            updated: 'Element został zaktualizowany |||| %{smart_count} elementów zostało zaktualizowanych',
            created: 'Element został utworzony',
            deleted: 'Element został usunięty |||| %{smart_count} elementów zostało usuniętych',
            bad_item: 'Niepoprawny element',
            item_doesnt_exist: 'Element nie istnieje',
            http_error: 'Błąd komunikacji z serwerem',
            data_provider_error: 'Błąd dostawcy danych. Sprawdź konsolę.',
            canceled: 'Operacja anulowana',
            logged_out: 'Twoja sesja wygasła, proszę zaloguj się ponownie.',
        },
        validation: {
            required: 'Wymagane',
            minLength: 'Musi mieć przynajmniej %{min} znaków',
            maxLength: 'Może mieć maksymalnie %{max} znaków',
            minValue: 'Minimalna wartość to %{min}',
            maxValue: 'Maksymalna wartość to %{max}',
            number: 'Musi być liczbą',
            email: 'Musi być poprawnym adresem e-mail',
            oneOf: 'Musi być jednym z: %{options}',
            regex: 'Musi pasować do wzorca (regexp): %{pattern}',
        },
    },
    resources: {
        users: {
            name: 'Użytkownik |||| Użytkownicy',
            fields: {
                firstname: 'Imię',
                enabled: 'Zaakceptowany',
                surname: 'Nazwisko',
                company: 'Firma',
                address: 'Adres',
                zip_code: 'Kod pocztowy',
                country: 'Kraj',
                phone: 'Nr tel',
                machine_type: 'Typ Maszyny',
                consdiered_products: 'Rozważane produkty',
            },
        },
        books: {
            name: 'Książka |||| Książki',
            fields: {
                first_name: 'First name',
                last_name: 'Last name',
                dob: 'Date of birth',
            }
        },
        products: {
            name: 'Produkt |||| Produkty',
            fields: {
                first_name: 'First name',
                last_name: 'Last name',
                dob: 'Date of birth',
            }
        }
    },
};

export default polishMessages;
