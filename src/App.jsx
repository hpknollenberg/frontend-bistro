import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import RestaurantName from './restaurant-name'


const styles = {
  items: {
    display: 'flex',
    fontSize: '2vh'
  },
  titles: {
    fontWeight: 'bold',
    paddingBottom: '1vh',
    paddingTop: '5vh',
    textShadow: '2px 2px rgb(150, 197, 247'
  },
  buttons: {
    boxShadow: '2px 2px rgb(150, 197, 247'
  }
}




function App() {
  const [menu, setMenu] = useState([]); //set state for menu, as well as each section of the menu (filtered)-vvv
  const [dinner, setDinner] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [appetizers, setAppetizers] = useState([]);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  
  let tempCart = JSON.parse(localStorage.getItem("cart"))

  const [cart, setCart] = useState(tempCart ? tempCart : [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])
  
  function addToCart(id, title, description, price) {
    setCart((cart) => {
      return cart.filter((food) => food.id !== id)
    })
    setCart(cart => [...cart, {id: id, title: title, description: description, price: price}])
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/menu_items/`) //fetching from the api
    .then(response => {
      setMenu(response.data)
      setAppetizers(response.data.filter((x) => x.category === "Appetizers").map((food) => { //filters appetizers (or whatever-vvv)
        return (
          <div key={food.id} style={{...styles.items}} className="row"> {/*Displays food item title, description, and price*/}
            <h3 className="">{food.title}</h3>
            <p className="col-9">{food.description}</p>
            <p className="col-2">{food.price}</p>
            <button className="col-3 col-md-1 ms-2 ms-md-0 mb-5" style={{...styles.buttons}} title="Add To Cart" onClick={() => { addToCart(food.id, food.title, food.description, food.price) }}
              >Add To Cart</button>
          </div>
        )
      }))
      setDinner(response.data.filter((x) => x.category === "Dinner").map((food) => {
        return (
          <div key={food.id} style={{...styles.items}} className="row">
            <h3 className="">{food.title}</h3>
            <p className="col-9">{food.description}</p>
            <p className="col-2">{food.price}</p>
            <button className="col-3 col-md-1 ms-2 ms-md-0 mb-5" style={{...styles.buttons}} title="Add To Cart" onClick={() => { addToCart(food.id, food.title, food.description, food.price) }}
              >Add To Cart</button>
          </div>
        )
      }))
      setLunch(response.data.filter((x) => x.category === "Lunch").map((food) => {
        return (
          <div key={food.id} style={{...styles.items}} className="row">
            <h3 className="">{food.title}</h3>
            <p className="col-9">{food.description}</p>
            <p className="col-2">{food.price}</p>
            <button className="col-3 col-md-1 ms-2 ms-md-0 mb-5" style={{...styles.buttons}} title="Add To Cart" onClick={() => { addToCart(food.id, food.title, food.description, food.price) }}
              >Add To Cart</button>
          </div>
        )
      }))
      setBreakfast(response.data.filter((x) => x.category === "Breakfast").map((food) => {
        return (
          <div key={food.id} style={{...styles.items}} className="row">
            <h3 className="">{food.title}</h3>
            <p className="col-9">{food.description}</p>
            <p className="col-2">{food.price}</p>
            <button className="col-3 col-md-1 ms-2 ms-md-0 mb-5" style={{...styles.buttons}} title="Add To Cart" onClick={() => { addToCart(food.id, food.title, food.description, food.price) }}
              >Add To Cart</button>
          </div>
        )
      }))
      setDrinks(response.data.filter((x) => x.category === "Drinks").map((food) => {
        return (
          <div key={food.id} style={{...styles.items}} className="row">
            <h3 className="">{food.title}</h3>
            <p className="col-9">{food.description}</p>
            <p className="col-2">{food.price}</p>
            <button className="col-3 col-md-1 ms-2 ms-md-0 mb-5" style={{...styles.buttons}} title="Add To Cart" onClick={() => { addToCart(food.id, food.title, food.description, food.price) }}
              >Add To Cart</button>
          </div>
        )
      }))
  }
  )}, [])



  return ( //Displays the main page of the website
    <div className="d-flex justify-content-center">
      <div className="p-3">
        <RestaurantName />'
        <h1 style={{...styles.titles}}>Appetizers</h1>
        {appetizers}
        <h1 style={{...styles.titles}}>Dinner</h1>
        {dinner}
        <h1 style={{...styles.titles}}>Lunch</h1>
        {lunch}
        <h1 style={{...styles.titles}}>Breakfast</h1>
        {breakfast}
        <h1 style={{...styles.titles}}>Drinks</h1>
        {drinks}
      </div>
    </div>
  )
}


export default App
