import React from 'react';
import axios from 'axios';
import Card from '../Card';

function Orders ({favLikesNow, onClickFavorites}){
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(()=>{
        (async () => {
            setIsLoading(true);
            try{
                const {data} = await axios.get("http://localhost:3001/orders");
            console.log(data)
            const flatArray = data.flatMap(item => {
                if (item['0']) {
                    return { ...item['0'], parentId: item.id }; // добавляем родительский id, если нужен
                }
                return null; // для элементов без '0' возвращаем null
            }).filter(Boolean); // убираем null из массива
            setOrders(flatArray);
            setIsLoading(false);
            }
            catch(error){
                alert('ошибка при запросе заказов');
                console.error(error);
            }
        })();
    }, []);
    const renderItems = () => {  
      
        return (isLoading ? [...Array(10)].map((_, index) => 
          <Card 
        key={index}
            loading={isLoading} 
            favLikesNow={favLikesNow} 
            onClickFavorites={onClickFavorites} 
            orderClick={true}
          />
        ) : orders.map(obj => 
          <Card 
            key={obj.id} 
            loading={isLoading} 
            favLikesNow={favLikesNow} 
            onClickFavorites={onClickFavorites} 
            id={obj.id} 
            title={obj.title} 
            price={obj.price} 
            img={obj.img} 
            orderClick={true}
          />
        ));
      }
    return(
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои заказы</h1>
        </div>
        <div className="d-flex flex-wrap">
        {renderItems()}
        {/* {orders.length>0 ? orders.map(obj => 
            <Card favLikesNow={favLikesNow} onClickFavorites={onClickFavorites} id={obj.id} title={obj.title} price={obj.price} img={obj.img}/>
          ) : ''} */}
        </div>
      </div>
    );
}

export default Orders;