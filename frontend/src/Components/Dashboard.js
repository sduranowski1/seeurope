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
import {useEffect, useState} from "react";

export const Dashboard = () => {
    const [orders, setOrders] = useState([]);


    const fetchData = [
        {itemNo: 0, product: 'ŁADOWARKA KOŁOWA', dateChange: '03.03.2024', info: 'abcdef'},
        {itemNo: 1, product: 'KOPARKA', dateChange: '01.03.2024', info: 'ijghkl'},
        {itemNo: 2, product: 'TRAKTOR', dateChange: '10.03.2024', info: 'bvcbcc'},
        {itemNo: 3, product: 'PODNOŚNIK TELESKOPOWY', dateChange: '11.03.2024', info: 'dgdgdd'},
        {itemNo: 4, product: 'ŁADOWARKA SKRZYNKOWA', dateChange: '12.03.2024', info: 'ouitrr'},
        {itemNo: 5, product: 'WÓZEK WIDŁOWY', dateChange: '13.03.2024', info: 'ertete'},
    ]

    useEffect(() => {
        // Fetch orders from an API or another data source
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://se-europe-test.pl/api/orders'); // Replace with your API endpoint
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    function displayData(number) {
        console.log(document.querySelector('.vehicles-list .productData .itemNo'));
    }

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
                                <table className="ordersTable" style={{width: "100%"}}>
                                    <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Email</th>
                                        {/*<th>Name</th>*/}
                                        {/*<th>Address</th>*/}
                                        <th>Phone</th>
                                        <th>Order Date</th>
                                        <th>Subtotal</th>
                                        <th>Tax</th>
                                        <th>Total</th>
                                        <th>Items</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.id}</td>
                                            <td>{order.email}</td>
                                            {/*<td>{order.name}</td>*/}
                                            {/*<td>{order.address || 'N/A'}</td>*/}
                                            <td>{order.phone || 'N/A'}</td>
                                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                            <td>${order.subtotal}</td>
                                            <td>${order.tax}</td>
                                            <td>${order.total}</td>
                                            <td>
                                                {/* Optional: Display items in a compact format */}
                                                {order.items.length > 0 ? (
                                                    <ul>
                                                        {order.items.map((item, itemIndex) => (
                                                            <li key={itemIndex}>
                                                                <strong>{item.name}</strong> - {item.quantity} x ${item.price}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No items in this order</p>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
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
        </main>
    );
}