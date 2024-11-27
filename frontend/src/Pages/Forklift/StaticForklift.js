import './Forklift.scss';

import personnel from "../../assets/forklift/personnel.png";
import container from "../../assets/forklift/container.png";
import stud from "../../assets/forklift/stud.png";
import tire from "../../assets/forklift/tire.png";
import drumLifter from "../../assets/forklift/drum-lifter.png";
import drumRotator from "../../assets/forklift/drum-rotator.png";
import fork from "../../assets/forklift/fork.png";
import gaffel from "../../assets/forklift/gaffel.png";

import protection from "../../assets/forklift/protection sleeve.png";
import crane from "../../assets/forklift/crane-jib.png";
import cross from "../../assets/forklift/cross-bar.png";
import carpet from "../../assets/forklift/carpet-boom.png";
import snow from "../../assets/forklift/snow-blade.png";
import snowChain from "../../assets/forklift/snow-chain.png";
import snowBucket from "../../assets/forklift/snow-bucket.png";
import sweeper from "../../assets/forklift/sweeper.png";
import bigBag from "../../assets/forklift/big-bag-lifter.png";
import safety from "../../assets/forklift/safety-mirror.png";
import forklift from "../../assets/forklift/forklift-yoke.png";
import {LinksListWithImages} from "../../Components/LinksListWithImages/LinksListWithImages";

export const StaticForklift = () => {
    const products = [
        {name: 'Kosze robocze', imgUrl: personnel},
        {name: 'Rampy do kontenerów', imgUrl: container},
        {name: 'Kolce do opon', imgUrl: stud},
        {name: 'Opona', imgUrl: tire},
        {name: 'Drum lifter', imgUrl: drumLifter},
        {name: 'Drum rotator', imgUrl: drumRotator},
        {name: 'Przedłużki wideł', imgUrl: fork},
        {name: 'Gaffel', imgUrl: gaffel},

        {name: 'Osłony wideł', imgUrl: protection},
        {name: 'Żuraw', imgUrl: crane},
        {name: 'Belki karetek', imgUrl: cross},
        {name: 'Carpet boom', imgUrl: carpet},
        {name: 'Snow blade', imgUrl: snow},
        {name: 'Łańcuchy śniegowe', imgUrl: snowChain},
        {name: 'Snow bucket', imgUrl: snowBucket},
        {name: 'Zamiatarki', imgUrl: sweeper},
        {name: 'Hak do big bagów', imgUrl: bigBag},
        {name: 'Lusterka panoramiczne', imgUrl: safety},
        {name: 'Haki', imgUrl: forklift},
    ];

    return (
        <main className={'my-machine'}>
            <section className={'section-contrains tables-page'}>
                <div className={'heading-container'}>
                    <h1 className={'page-title'}>Wózek widłowy</h1>
                    <p className={'paragraph paragraph--medium'}>
                        Tutaj znajdziesz pełną standardową gamę sprzętu SE Equipment do wózków widłowych.
                    </p>
                    <br />
                    <p className={'paragraph paragraph--medium'}>
                        Kliknij na wybrany produkt poniżej, aby znaleźć odpowiedni sprzęt dla siebie.
                    </p>
                </div>
                <LinksListWithImages data={products} />
            </section>
        </main>
    );
}