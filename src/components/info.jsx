import React from 'react';
import { AppContext } from '../App';

const Info = ({title, image, description, isOrderComplete}) => {
  const {onCloseBasket} = React.useContext(AppContext);
  return (
    <div class="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              class="mb-20"
              width="120px"
              height="120px"
              src={image}
              alt="empty"
            />
            <h2>{title}</h2>
            <p class="opacity-6">
              {description}
            </p>
            {/* <a href="#" onClick={onCloseBasket} class="greenButton">
              <img src="/img/arrow.svg" alt="Arrow"/>
              <span>Вернуться назад</span>
            </a> */}
            {isOrderComplete ? <button onClick={onCloseBasket} className="greenButton">
   <img src="/img/arrow.svg" alt="Arrow" />
   <span>Вернуться назад</span>
 </button> : ' '}
            
          </div>
  )
}

export default Info;
