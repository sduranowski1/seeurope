// import './MyPage.scss';
import excavator from '.././assets/home/excavator.png';
import wheelLoader from '.././assets/home/wheel-loader.png';
import tractor from '.././assets/home/tractor.png';
import telescopicHandler from '.././assets/home/telescopic-handler.png';
import skidLoader from '.././assets/home/skid-loader.png';
import forkLift from '.././assets/home/fork-lift.png';
import AccordionSummary from "@mui/material/AccordionSummary";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import {useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import AuthContext from "../AuthContext";
import {Button} from "@mui/material";
import OrderItemsModal from "./OrderItemsModal/OrderItemsModal";
import OrderAddressModal from "./OrderAddressModal/OrderAddressModal";

export const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const { token } = useContext(AuthContext); // Get token from AuthContext
    const [userId, setUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    console.log(JSON.parse(atob(token.split('.')[1])))
    // const fetchData = [
    //     {itemNo: 0, product: 'ŁADOWARKA KOŁOWA', dateChange: '03.03.2024', info: 'abcdef'},
    //     {itemNo: 1, product: 'KOPARKA', dateChange: '01.03.2024', info: 'ijghkl'},
    //     {itemNo: 2, product: 'TRAKTOR', dateChange: '10.03.2024', info: 'bvcbcc'},
    //     {itemNo: 3, product: 'PODNOŚNIK TELESKOPOWY', dateChange: '11.03.2024', info: 'dgdgdd'},
    //     {itemNo: 4, product: 'ŁADOWARKA SKRZYNKOWA', dateChange: '12.03.2024', info: 'ouitrr'},
    //     {itemNo: 5, product: 'WÓZEK WIDŁOWY', dateChange: '13.03.2024', info: 'ertete'},
    // ]

    const fetchOrders = async (page = 1) => {
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

                    const userData = await response_user.json();
                    const email = userData?.email


                    const response = await fetch(`https://se-europe-test.pl/api/enova_orders?email=${email}&page=${page}&order[id]=desc`, {
                        headers: {
                            'Accept': 'application/ld+json'
                        }
                    });

                    const data = await response.json();
                    console.log(data); // Debug JSON-LD response

                    setOrders(data['hydra:member'] || []);

                    // Extract total pages from hydra:view
                    if (data['hydra:view']) {
                        const lastPageMatch = data['hydra:view']['hydra:last']?.match(/page=(\d+)/);
                        setTotalPages(lastPageMatch ? Number(lastPageMatch[1]) : 1);
                    }
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

// Fetch first page on component mount
    useEffect(() => {
        fetchOrders(1);
    }, []);

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]); // Refetch when page changes


    function displayData(number) {
        console.log(document.querySelector('.vehicles-list .productData .itemNo'));
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [modalAddressOpen, setModalAddressOpen] = useState(false);
    const [currentOrderItems, setCurrentOrderItems] = useState([]);
    const [currentOrderAddress, setCurrentOrderAddress] = useState([]);

    const handleOpenModal = (pozycjeDokHandlowego) => {
        setCurrentOrderItems(pozycjeDokHandlowego);
        setModalOpen(true);
    };
    const handleOpenModalAddress = (lokalizacjaDostawy) => {
        setCurrentOrderAddress(lokalizacjaDostawy);
        setModalAddressOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleCloseModalAddress = () => {
        setModalAddressOpen(false);
    };

    return (
        <main className={'my-page'}>

            <section className={'section-contrains tables-page'}>
                <Accordion className={'aside__line aside__line--accordion'}>
                    <AccordionSummary
                        expandIcon={<FontAwesomeIcon className={'angle-up'} icon={faAngleUp} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Link className={'aside__line aside__line--narrow'} >Purchases</Link>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={'productData'}>
                            {orders.length > 0 ? (
                                <>
                                <table className="ordersTable" style={{width: "100%"}}>
                                    <thead>
                                    <tr>
                                        <th>Index</th>
                                        <th>Order ID</th>
                                        <th>Email</th>
                                        {/*<th>Name</th>*/}
                                        {/*<th>Address</th>*/}
                                        <th>Phone</th>
                                        <th>Order Date</th>
                                        {/*<th>Subtotal</th>*/}
                                        {/*<th>Tax</th>*/}
                                        <th>Total</th>
                                        <th>Currency</th>
                                        <th>Items</th>
                                        <th>Address</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.slice().map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.id}</td>
                                            <td>{order.orderNumber}</td>
                                            <td>{order.email}</td>
                                            {/*<td>{order.name}</td>*/}
                                            {/*<td>{order.address || 'N/A'}</td>*/}
                                            <td>{order?.lokalizacjaDostawy?.adres?.telefon || order?.phone || ''}</td>
                                            <td>{new Date(order.terminPlatnosci).toLocaleDateString('en-GB', { timeZone: 'UTC' })}</td>
                                            {/*<td>{order.subtotal}</td>*/}
                                            {/*<td>{order.tax}</td>*/}
                                            <td>{order.wartosc}</td>
                                            <td>{order.pozycjeDokHandlowego[0]?.symbolWaluty}</td>
                                            <td>
                                                <Button
                                                    variant="text"  // Set the variant to 'text' for a text-style button
                                                    color="primary" // Use the primary color (usually blue in Material UI)
                                                    onClick={() => handleOpenModal(order.pozycjeDokHandlowego)}
                                                    style={{
                                                        padding: 0,
                                                        textTransform: 'none',
                                                        fontSize: '14px',
                                                        fontWeight: 'normal',
                                                        textDecoration: 'underline',
                                                        backgroundColor: 'transparent', // Make background transparent
                                                    }}
                                                >
                                                    View Items
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="text"  // Set the variant to 'text' for a text-style button
                                                    color="primary" // Use the primary color (usually blue in Material UI)
                                                    onClick={() => handleOpenModalAddress(order.lokalizacjaDostawy.adres)}
                                                    style={{
                                                        padding: 0,
                                                        textTransform: 'none',
                                                        fontSize: '14px',
                                                        fontWeight: 'normal',
                                                        textDecoration: 'underline',
                                                        backgroundColor: 'transparent', // Make background transparent
                                                    }}
                                                >
                                                    View Address
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                                    {/* Pagination Controls */}
                                    <div className="pagination">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>

                                        <span>Page {currentPage} of {totalPages}</span>

                                        <button
                                            onClick={() => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </div>

                                </>
                            ) : (
                                <p>No orders available</p>
                            )}
                        </div>
                    </AccordionDetails>

                </Accordion>
                <Accordion className={'aside__line aside__line--accordion'}>
                    <AccordionSummary
                        expandIcon={<FontAwesomeIcon className={'angle-up'} icon={faAngleUp} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Link className={'aside__line aside__line--narrow'} >Lista cen</Link>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            <li>
                                Aby ułatwić Ci zakupy, teraz nasze ceny będą widoczne bezpośrednio na produktach.
                                Poprzedni cennik jest już nieważny.
                                Dzięki tej zmianie zawsze będziesz miał dostęp do najnowszych, aktualnych cen.
                                <br />
                                Kliknij poniżej na wybrany zakres maszyn, aby zobaczyć najnowsze zaktualizowane produkty.
                            </li>
                    <div className={'vehicles-list'}>
                        <Link className={'vehicle-link'} data-tab="0" onClick={() => displayData(0)} to="">
                            <picture>
                                <img src={wheelLoader}/>
                            </picture>
                            <p className={'vehicle-name link-title--smaller'}>ŁADOWARKA KOŁOWA</p>
                        </Link>
                        <Link className={'vehicle-link'} data-tab="1" onClick={() => displayData(1)} to="">
                            <picture>
                                <img src={excavator}/>
                            </picture>
                            <p className={'vehicle-name link-title--smaller'}>KOPARKA</p>
                        </Link>
                        <Link className={'vehicle-link'} data-tab="2" onClick={() => displayData(2)} to="">
                            <picture>
                                <img src={tractor}/>
                            </picture>
                            <p className={'vehicle-name link-title--smaller'}>TRAKTOR</p>
                        </Link>
                        <Link className={'vehicle-link'} data-tab="3" onClick={() => displayData(3)} to="">
                            <picture>
                                <img src={telescopicHandler}/>
                            </picture>
                            <p className={'vehicle-name link-title--smaller'}>PODNOŚNIK TELESKOPOWY</p>
                        </Link>
                        <Link className={'vehicle-link'} data-tab="4" onClick={() => displayData(4)} to="">
                            <picture>
                                <img src={skidLoader}/>
                            </picture>
                            <p className={'vehicle-name link-title--smaller'}>ŁADOWARKA SKRZYNKOWA</p>
                        </Link>
                        <Link className={'vehicle-link'} data-tab="5" onClick={() => displayData(5)} to="">
                            <picture>
                                <img src={forkLift}/>
                            </picture>
                            <p className={'vehicle-name link-title--smaller'} >WÓZEK WIDŁOWY</p>
                        </Link>
                    </div>
                        </ul>
                        <div className={'infoData'}>
                            <p>Nr produktu</p>
                            <p>Produkt</p>
                            <p>Data zmiany</p>
                            <p>Informacje</p>
                        </div>
                        <div className={'productData'}>
                            <p className={'itemNo'}></p>
                            <p className={'product'}></p>
                            <p className={'dateChange'}></p>
                            <p className={'info'}></p>
                        </div>
                    </AccordionDetails>
                </Accordion>
                {/*<Accordion className={'aside__line aside__line--accordion'}>*/}
                {/*    <AccordionSummary*/}
                {/*        expandIcon={<FontAwesomeIcon className={'angle-up'} icon={faAngleUp} />}*/}
                {/*        aria-controls="panel1-content"*/}
                {/*        id="panel1-header"*/}
                {/*    >*/}
                {/*        <Link className={'aside__line aside__line--narrow'} >Moje ulubione produkty</Link>*/}
                {/*    </AccordionSummary>*/}
                {/*    <AccordionDetails>*/}
                {/*        <ul >*/}
                {/*            <li>*/}
                {/*                3 punkt*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*    </AccordionDetails>*/}
                {/*</Accordion>*/}
                <Accordion className={'aside__line aside__line--accordion'}>
                    <AccordionSummary
                        expandIcon={<FontAwesomeIcon className={'angle-up'} icon={faAngleUp} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Link className={'aside__line aside__line--narrow'} >Moje dane</Link>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul >
                            <li>
                                <a href='/dashboard/my-details'>Zmień swoje dane</a>
                            </li>
                        </ul>

                    </AccordionDetails>
                </Accordion>
                <Accordion className={'aside__line aside__line--accordion'}>
                    <AccordionSummary
                        expandIcon={<FontAwesomeIcon className={'angle-up'} icon={faAngleUp} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Link className={'aside__line aside__line--narrow'} >Dokumenty</Link>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul >
                            <li>
                            Tutaj znajdziesz ważne dokumenty.
                            </li>
                        </ul>

                    </AccordionDetails>
                </Accordion>
                <Accordion className={'aside__line aside__line--accordion'}>
                    <AccordionSummary
                        expandIcon={<FontAwesomeIcon className={'angle-up'} icon={faAngleUp} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Link className={'aside__line aside__line--narrow'} >Bank zdjęć</Link>
                    </AccordionSummary>
                    <AccordionDetails>
                    <div className={'vehicles-list'}>
                        <Link className={'vehicle-link'} data-tab="0" onClick={() => displayData(0)} to="">
                            <picture>
                                <img src={wheelLoader}/>
                            </picture>
                            <p className={'vehicle-name link-title--smaller'}>ŁADOWARKA KOŁOWA</p>
                        </Link>
                        <Link className={'vehicle-link'} data-tab="1" onClick={() => displayData(1)} to="">
                            <picture>
                                <img src={excavator}/>
                            </picture>
                            <p className={'vehicle-name link-title--smaller'}>KOPARKA</p>
                        </Link>
                        <Link className={'vehicle-link'} data-tab="2" onClick={() => displayData(2)} to="">
                            <picture>
                                <img src={tractor}/>
                            </picture>
                            <p className={'vehicle-name link-title--smaller'}>TRAKTOR</p>
                        </Link>
                        <Link className={'vehicle-link'} data-tab="3" onClick={() => displayData(3)} to="">
                            <picture>
                                <img src={telescopicHandler}/>
                            </picture>
                            <p className={'vehicle-name link-title--smaller'}>PODNOŚNIK TELESKOPOWY</p>
                        </Link>
                        <Link className={'vehicle-link'} data-tab="4" onClick={() => displayData(4)} to="">
                            <picture>
                                <img src={skidLoader}/>
                            </picture>
                            <p className={'vehicle-name link-title--smaller'}>ŁADOWARKA SKRZYNKOWA</p>
                        </Link>
                        <Link className={'vehicle-link'} data-tab="5" onClick={() => displayData(5)} to="">
                            <picture>
                                <img src={forkLift}/>
                            </picture>
                            <p className={'vehicle-name link-title--smaller'} >WÓZEK WIDŁOWY</p>
                        </Link>
                    </div>

                    </AccordionDetails>
                </Accordion>
            </section>
            <OrderItemsModal
                open={modalOpen}
                onClose={handleCloseModal}
                items={currentOrderItems}
            />
            <OrderAddressModal
                openAddress={modalAddressOpen}
                onCloseAddress={handleCloseModalAddress}
                addresses={currentOrderAddress}
            />
        </main>
    );
}