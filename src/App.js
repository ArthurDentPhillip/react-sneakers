import Header from "./components/Header";
import Basket from "./components/Basket";
import Favorites from "./components/Favourites";
import React from "react";
import axios from 'axios';
import Home from "./components/Home";
import Orders from "./components/Orders";
import { Route, Routes } from "react-router-dom"

export const AppContext = React.createContext({});
function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [favoritesItems, setFavoritesItems] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  // const [isAddedButton, setAddedButton] = React.useState(false);
  // const [ordersId, setOrdersId] = React.useState('');

  React.useEffect(()=>{
    async function fetchData(){
      setIsLoading(true);
      const cartResponce = await axios.get("http://localhost:3001/cart");
      const favoritemsResponce = await axios.get("http://localhost:3001/favorites");
      const itemsResponce = await axios.get("http://localhost:3001/items");
      
      setIsLoading(false);
      setItems(itemsResponce.data);
      setCartItems(cartResponce.data);
      setFavoritesItems(favoritemsResponce.data);
    }
    fetchData();
    
      // axios.get("http://localhost:8093/items").then((res)=>setItems(res.data));
      // axios.get("http://localhost:8093/cart").then((res)=>setCartItems(res.data));
      // axios.get("http://localhost:8093/favorites").then((res)=>setFavoritesItems(res.data));
  }, []);

  
const onChangeValue = (event) => {
  setSearchValue(event.target.value)
}

const onAddToBasket = (obj) => {
  if(cartItems.find((item)=> item.id === obj.id)){
    axios.delete(`http://localhost:3001/cart/${obj.id}`);
    setCartItems((prev)=> prev.filter((item)=> item.id !== obj.id));
  }
  else{
    axios.post("http://localhost:3001/cart", obj);
    setCartItems((prev)=>[...prev, obj]);
  }
  // axios.post("http://localhost:8093/cart", obj)
  // let title = obj.title;
  // const presOfValInArr = cartItems.some(obj => Object.values(obj).includes(title));
  
  // if(!presOfValInArr){
  //   setCartItems([...cartItems, obj]);
  // }
  
}

const onRemoveItem = (id) => {
  axios.delete(`http://localhost:3001/cart/${id}`);
  setCartItems((prev)=> prev.filter((item) => item.id !==id));

}

const onDeleteInBasket = (obj) => {
  const newObj = cartItems.filter((value)=>{
    return value.title !== obj;
    });
    setCartItems(newObj);
    console.log(cartItems)
}


// const saveOrders = () => {
//   let lengthCart;
//   axios.post("http://localhost:8093/orders", cartItems);
//   axios.get("http://localhost:8093/orders").then((res)=>setOrdersId(res.data));
//   // let lengthOreders = ordersId.length;
//   // const lastOrderId = ordersArray[ordersArray.length - 1]; 
//   // const lastId = lastOrder.id;
//   axios.get("http://localhost:8093/cart").then((res)=>lengthCart = res.data);
//   console.log(lengthCart)
//   // axios.delete("http://localhost:8093/cart") 
//   //     .then((response) => {
//   //       console.log("Вся корзина удалена");
//   //     })
//   //     .catch((error) => {
//   //       console.error("Произошла ошибка при удалении корзигы:", error);
//   //     });
//   setCartItems([]);
//   // setOrdersId(lastId);
//   // alert(setOrdersId);
//   // console.log(lengthArray)
// }

const onCloseBasket = () => {
  console.log('cart open')
  setCartOpened(false); 
  window.location.reload();
}

const onClickFavorites = (id, title, price, img) => {
  const foundItem = favoritesItems.find(item => item.id === id);
  console.table(cartItems)
  if (foundItem) {
    // Удаляем элемент из избранного
    axios.delete("http://localhost:3001/favorites/" + id)
      .then(() => {
        setFavoritesItems(prev => prev.filter(item => item.id !== id)); // Убедимся, что убираем foundItem
      })
      .catch(error => {
        console.error("Ошибка при удалении:", error);
      });
  } else {
    // Добавляем новый элемент в избранное
    const favorites = {
      "id": id,
      "title": title,
      "price": price,
      "img": img,
    };

    axios.post("http://localhost:3001/favorites", favorites)
      .then(() => {
        setFavoritesItems(prev => [...prev, favorites]); // Добавляем favorites в список
      })
      .catch(error => {
        console.error("Ошибка при добавлении:", error);
      });
  }
};


const onClickFavoritesDelete = (id, title, price, img) => {
  axios.delete(`http://localhost:3001/favorites/${id}`);
  setFavoritesItems((prev)=> prev.filter((item) => item.id !==id));
}
  return (
    <AppContext.Provider value={{items, cartItems, favoritesItems, onAddToBasket, onCloseBasket, setCartItems}}>
<div className="wrapper clear">
      {cartOpened ? <Basket onRemove={onRemoveItem} onCloseBasket={onCloseBasket} items={cartItems} setCartItems={setCartItems} onClickDeleteInBasket={onDeleteInBasket}/> : null}
      <Header onOpenCart={() => setCartOpened(true)}/>
      <Routes>
        <Route path="/" element={<Home isLoading={isLoading} favLikesNow={false} searchValue={searchValue} items={items} onChangeValue={onChangeValue} onClickFavorites={onClickFavorites}/>}/>
        <Route path="favorites" element={<Favorites favLikesNow={true} onClickFavorites={onClickFavoritesDelete}/>}/>
        <Route path="orders" element={<Orders favLikesNow={false} onClickFavorites={onClickFavoritesDelete}/>}/>
      </Routes>
    </div>
    </AppContext.Provider>
    
  );
}

export default App;
