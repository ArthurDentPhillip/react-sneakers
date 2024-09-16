import styles from './Home.module.scss';
import React from 'react';
import Card from '../Card';

function Home ({isLoading, favLikesNow, searchValue, items, onChangeValue, onClickFavorites}){
const renderItems = () => {
  const filteredItems = items.filter((item)=>item.title.toLowerCase().includes(searchValue));
  // return (isLoading ? [...Array(10)] : filteredItems).map(obj => 
  //   <Card loading={isLoading} cartItems={cartItems} favLikesNow={favLikesNow} favouriteLikes={favouriteLikes} onClickFavorites={onClickFavorites} id={obj.id} title={obj.title} price={obj.price} img={obj.img} onClickAddToBasket={onClickAddToBasket}/>
  // )


  return (isLoading ? [...Array(10)].map((_, index) => 
    <Card 
  key={index}
      loading={isLoading} 
      favLikesNow={favLikesNow} 
      onClickFavorites={onClickFavorites} 
      orderClick={false}
    />
  ) : filteredItems.map(obj => 
    <Card 
      key={obj.id} 
      loading={isLoading} 
      favLikesNow={favLikesNow} 
      onClickFavorites={onClickFavorites} 
      id={obj.id} 
      title={obj.title} 
      price={obj.price} 
      img={obj.img} 
      orderClick={false}
    />
  ));
}
    return(
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img className="ml-5" src="/img/search.svg" alt="Search" />
            <input onChange={onChangeValue} placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {renderItems()}
        </div>
      </div>
    );
}

export default Home;