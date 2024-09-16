import { Link } from "react-router-dom";
import React from "react";
import { AppContext } from '../../App';

function Header (props){
  const {cartItems} = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => sum + Number(obj.price), 0);

    return(
        <header className="d-flex justify-between align-center">
        <div className="d-flex align-center">
            <Link to="/">
              <img className="mr-10" width={40} height={40} src="/img/logo.png" alt="logo"/>
            </Link>
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="d-flex">
          <li className="mr-30" onClick={props.onOpenCart} style={{cursor: 'pointer'}}>
            <img width={18} height={18} src="img/cart.svg" alt="Корзина"/>
            <span> {totalPrice} руб.</span>
          </li>
          <li className="mr-30">
            <Link to="/favorites">
              <img width={18} height={18} src="img/heart.svg" alt="Избранное" />
            </Link>
          </li>
          <li>
          <Link to="/orders">
            <img width={18} height={18} src="img/user.svg" alt="Пользователь" />
            </Link>
            
          </li>
        </ul>
      </header>
    );
}

export default Header;