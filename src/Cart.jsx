import RestaurantName from './restaurant-name'
import { useState } from 'react';
import { useEffect } from 'react';


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

function Contact() {  

  let tempCart = JSON.parse(localStorage.getItem("cart"))

  const [cart, setCart] = useState(tempCart ? tempCart : [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  function deleteFromCart(id) {
    setCart((cart) => {
        return cart.filter((food) => food.id !== id)})
    }
  

  function populateCart(cartList) {
    return (
        cartList.map((food) => (
            <div key={food.id} style={{...styles.items}} className="row"> {/*Displays food item title, description, and price*/}
            <h3 className="">{food.title}</h3>
            <p className="col-9">{food.description}</p>
            <p className="col-2">{food.price}</p>
            <button className="col-3 col-md-1 ms-2 ms-md-0 mb-5" style={{...styles.buttons}} title="Delete From Cart" onClick={() => { deleteFromCart(food.id) }}
              >Delete From Cart</button>
          </div>
        ))
    )
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="p-3" >
        <RestaurantName />
        <h1 style={{...styles.titles}}>Your Cart</h1>
        {populateCart(cart)}
      </div>
    </div>
  )
}


export default Contact