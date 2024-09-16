import React from 'react';
import Card from '../Card';
import { AppContext } from '../../App';

function Favorites ({favLikesNow, onClickFavorites}){
  const {favoritesItems} = React.useContext(AppContext);
    return(
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Избранное</h1>
        </div>
        <div className="d-flex flex-wrap">
        {favoritesItems.length>0 ? favoritesItems.map(obj => 
            <Card favLikesNow={favLikesNow} onClickFavorites={onClickFavorites} orderClick={false} id={obj.id} title={obj.title} price={obj.price} img={obj.img}/>
          ) : ''}
          {console.table('items' - favoritesItems)}
        </div>
      </div>
    );
}

export default Favorites;