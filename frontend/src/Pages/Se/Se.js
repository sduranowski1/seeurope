import { useState } from 'react';
import sketch from '../../assets/100838.png';
import { ThreePoint } from '../ThreePoint/ThreePoint';
import './Se.scss';

export const Se = () => {

    const [itemsToOrder, setItemsToOrder] = useState(1);

    

    function makeOrder(number) {
        console.log(`${itemsToOrder} ordered`);
    }
    
    return (
        <main className='product-page'>
            <ThreePoint></ThreePoint>
            <section className={'section-contrains tables-page item-page'}>
                <div>
                    <h1>ADAPTER 3-PUNKTOWY DO SMS/EURO MECH</h1>
                    <p>SE100838</p>
                    <br></br>
                    <h2>Adapter do ciągnika</h2>
                    <br></br>
                    <p>Z adapterem od SE Equipment oszczędzasz zarówno czas, jak i pieniądze.</p>
                    <br></br>
                    <p>SE Equipment oferuje proste rozwiązanie, które sprawi, że Twoja praca będzie bardziej efektywna. Dzięki naszemu adapterowi z mocowaniem 3-punktowym kat 2 po stronie maszyny i SMS/Euro po stronie osprzętu, masz możliwość zamontowania jednego osprzętu z innym złączem niż to, do którego maszyna jest przystosowana. Z naszym adapterem nie musisz ponosić dodatkowych kosztów związanych z zakupem nowego sprzętu lub nowej maszyny.</p>
                    <br></br>
                    <p>Prezentujemy nasze adaptery w dużej różnorodności i w wielu różnych kombinacjach, ale wszystkie są produkowane z solidną ramą, aby wytrzymać cięższe obciążenia. Jeśli masz zadanie, w którym często musisz przełączać się między różnymi urządzeniami, nasz adapter jest optymalnym rozwiązaniem.</p>
                    <br></br>
                    <h3>Korzyści:</h3>
                    <ul>
                    <li>Proste rozwiązanie dla bardziej efektywnej pracy</li>
                    <li>Uniknięcie zakupu nowej maszyny lub sprzętu</li>
                    <li>Wiele różnych modeli</li>
                    </ul>
                    <br></br>
                    <h3>DANE TECHNICZNE</h3>
                    <ul>
                        <li>Udźwig: 2500 kg</li>
                        <li>Szerokość: 1134 mm</li>
                        <li>Wysokość: 781 mm</li>
                        <li>Waga: 87 kg</li>
                        <li>Mocowanie: 3 punktowe</li>
                        <li>Strona maszyny: 3 punktowe Kat 2</li>
                        <li>Strona osprzętu: SMS/Euro</li>
                        <li>Produkt: Adapter</li>
                    </ul>
                    <div className='price-container'>
                        <h2>899.99$</h2>
                    </div>
                    <div className={'item-quantity'}>
                        <button className='quantity-btn'>-</button>
                        <p>0</p>
                        <button className='quantity-btn' >+</button>
                        <button className='buy-btn btn-container'>BUY</button>
                    </div>
                </div>
                <div>
                    <img src={sketch}/>
                </div>
            </section>
        </main>
    );
}