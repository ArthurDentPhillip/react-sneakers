import React from "react";
import Info from "../info";
import { AppContext } from '../../App';
import axios from 'axios';

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));
function Basket({
    items = [],
    onCloseBasket,
    onRemove,
    setCartItems
  }) {
    // const handlerDeleteCart = (obj) => {
    //   onClickDeleteInBasket(obj)
    // }
    ;
 
    // const handleClick = (event) => {
    //   event.stopPropagation();
    //   onCloseBasket();
    //   // setOrderPlaced(false);
    // };
 const [isOrderComplete, setIsOrderComplete] = React.useState(false);
 const [isLoading, setIsLoading] = React.useState(false);
 const {cartItems} = React.useContext(AppContext);
 const [orderId, setOrderId] = React.useState(null);
   const totalPrice = cartItems.reduce((sum, obj) => sum + Number(obj.price), 0);

 const onClickOrder = async () => {
  try{
    setIsLoading(true);
    const {data} = await axios.post("http://localhost:3001/orders", cartItems);
    // await axios.put("http://localhost:3001/cart", []);
    setOrderId(data.id);
    setIsOrderComplete(true);
    
    for(let i = 0; i<cartItems.length; i++){
      const item = cartItems[i];
      await axios.delete(`http://localhost:3001/cart/${item.id}`);
      await delay();
    }

    setCartItems([]);
  }
  catch (error){
    alert('Не удалось создать заказ :(')
  }
  setIsLoading(false);
  // setTimeout(() => window.location.reload(), 2000);
 }
    return (
      <div className="overlay">
        <div className="drawer">
          <h2 className="mb-30 d-flex justify-between">
            Корзина{" "}
            <img
              onClick={onCloseBasket}
              className="removeBtn cu-p"
              src="/img/btn-remove.svg"
              alt="Remove"
            />
          </h2>
          {items.length > 0 ? (
            <div className="items" style={{ flexGrow: 2 }}>
              {items.map((obj) => (
                <div className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.img})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>) : (<Info 
            title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
            description={isOrderComplete ? `Ваш заказ ${orderId} скоро будет передан курьерской службе доставки` : "Добавьте хотя бы одну пару кроссовок"} 
            isOrderComplete={isOrderComplete}/>)
  }
            <div className="cartTotalBlock">
            <ul className="cartTotalBlock">
              <li className="d-flex align-items mb-20">
                <span className="d-flex">Итого:</span>
                <div></div>
                <b>{totalPrice} руб</b>
              </li>
              <li className="d-flex align-items mb-20">
                <span className="d-flex">Налог 5%</span>
                <div></div>
                <b>{totalPrice/100*5} руб</b>
              </li>
            </ul>
            {!isOrderComplete ? <button disabled={isLoading} className="greenButton" onClick={onClickOrder}>
              Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
            </button> : ''}
            
          </div>
        </div>
      </div>
      
          
              
          ) 
        }
            
   {/* {!orderPlaced ? () : (<div></div>) */}

{/* }
          
        </div>
      </div>
    ); */}
  // }
  
  export default Basket;