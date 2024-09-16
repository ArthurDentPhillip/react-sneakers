import styles from './Card.module.scss';
import React from 'react';
import ContentLoader from "react-content-loader";
import { AppContext } from '../../App';

function Card ({favLikesNow, id='', title='', price='', img='', onClickFavorites, loading = false, orderClick}){
  const {cartItems, onAddToBasket} = React.useContext(AppContext);
  const [some, setSome] = React.useState(cartItems.some(obj => obj.id === id));
  // const some = cartItems.some(obj => obj.id === id);
  const [isAddedButton, setAddedButton] = React.useState(some);
  // setAddedButton(some);
  const [favouriteLikes, setFavouriteLikes] = React.useState(favLikesNow);

  const mainHandler = () => {
    onAddToBasket({id, title, price, img});
    setAddedButton(!isAddedButton);
  }

  const likeHandler = () => {
    setFavouriteLikes(!favouriteLikes);
  }

    return(
<div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favourite}>
         <img onClick={() => {
          onClickFavorites(id, title, price, img);
         likeHandler();
        }} className={styles.favClick} src={favouriteLikes ? "/img/liked.svg" : "/img/unliked.svg" } alt="Unliked"/>
        </div>
        <img with={133} height={112} src={img} alt='sneakers'/>
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className='d-flex flex-column'>
            <span>Цена</span>
            <b>{price} руб</b>
          </div>
          { !orderClick ? <img className={styles.plus} onClick={mainHandler} width={30} height={30} src={isAddedButton ? "/img/btn-checked.svg" : "/img/btn-plus.svg" }  alt='Plus'/>
          : ''
          }
          
        </div>
        </>
      )}
    </div>      
    );
}

export default Card;