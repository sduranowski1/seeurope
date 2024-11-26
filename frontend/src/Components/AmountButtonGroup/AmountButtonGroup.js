import * as React from "react";
import {useContext, useState} from "react";
import {CartContext} from "../../App";
import './AmountButtonGroup.scss';
import jsonProducts from '../../data/products.json';
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
let products = JSON.parse(JSON.stringify(jsonProducts, null, 2));

export const AmountButtonGroup = ({product}) => {
    const [cart, setCart] = useContext(CartContext);

    const [amount, setAmount] = useState(1);

    function findProduct(product) {
        return products.find(el => el.id === product.artNo);
    }

    function checkItemQuantity(cart, item, amountToChange) {
        const existingItem = cart.find(el => el.id === item.id);
        if (existingItem) {
            existingItem.quantity += amountToChange;
        } else {
            pushToCart(cart, item, amountToChange);
        }
    }

    function pushToCart(cart, item, amountToChange) {
        item['quantity'] = amountToChange;
        cart.push(item);
    }

    function changeCart(product, amountToChange) {
        console.log('run')
        const cartProduct = findProduct(product);
        const newCart = [...cart];
        checkItemQuantity(newCart, cartProduct, amountToChange);

        newCart.forEach(el => el.quantity < 0 ? el.quantity = 0 : '');
        const filteredItems = newCart.filter(el => el.quantity > 0);

        setCart(filteredItems);
        console.log(filteredItems);
    }

    function onToggleFav(event) {
        if(event.target.style.color === '') {
            event.target.style.color = 'red'
        } else {
            event.target.style.color = ''
        }
    }
    return (
        <>
            <td className={'amount-btn-group'}>
                <button className='buy-btn btn-container' onClick={() => {
                    changeCart(product, amount);
                    setAmount(1);
                }}>BUY</button>
                <button className='btn-container btn-amount' onClick={() => setAmount(amount > 0 ? amount - 1 : 0 )}>-</button>
                <p className={'buy-btn btn-container '}>{amount}</p>
                <button className='btn-container btn-amount' onClick={() => setAmount(amount + 1)}>+</button>
            </td>
            <td><FontAwesomeIcon icon={faHeart} className={'like favourite-container'} onClick={onToggleFav} /></td>
        </>
    )
}