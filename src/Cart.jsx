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
  
  let tempCustomer = JSON.parse(localStorage.getItem("customer"))
  let tempCartAmounts = JSON.parse(localStorage.getItem("cartAmounts"))
  let tempCartPrices = JSON.parse(localStorage.getItem("cartPrices"))
  let tempCart = JSON.parse(localStorage.getItem("cart"))

  const [customer, setCustomer] = useState(tempCustomer ? tempCustomer : "")
  const [cartAmounts, setCartAmounts] = useState(tempCartAmounts ? tempCartAmounts : [])
  const [cartPrices, setCartPrices] = useState(tempCartPrices ? tempCartPrices : [])
  const [cart, setCart] = useState(tempCart ? tempCart : [])



  useEffect(() => {
    localStorage.setItem("customer", JSON.stringify(customer))
  }, [customer])

  useEffect(() => {
    localStorage.setItem("cartAmounts", JSON.stringify(cartAmounts))
  }, [cartAmounts])

  useEffect(() => {
    localStorage.setItem("cartPrices", JSON.stringify(cartPrices))
  }, [cartPrices])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  

  function deleteFromCart(id) {
    setCart((cart) => {
        return cart.filter((food) => food.id !== id)})
    }
    


  function itemTotal(amount, price, id) {
    if (cartPrices.length < id)
      for (let i = 0; i <= (id - cartPrices.length); i++) {
        setCartPrices(...cartPrices, cartPrices.push(0))
      }
    const copyCartPrices = [...cartPrices]
    copyCartPrices[id] = amount * price
    setCartPrices(copyCartPrices)

    if (cartAmounts.length < id) {
      for (let i = 0; i <= (id - cartAmounts.length); i++) {
        setCartAmounts(...cartAmounts, cartAmounts.push(1))
      }
    }
    const copyCartAmounts = [...cartAmounts]
    copyCartAmounts[id] = amount
    setCartAmounts(copyCartAmounts)
  }

  function populateCart(cartList) {
    return (
        cartList.map((food) => (
            <div key={food.id} style={{...styles.items}} className="row"> {/*Displays food item title, description, and price*/}
            <h3 className="col-5">{food.title}</h3>
            <p className="col-1">{food.price}</p>
            <input defaultValue="1" value={cartAmounts[food.id]} type="number" min="1" className="col-1" onChange={(e) => itemTotal(e.target.value, food.price, food.id)} />
            <button className="col-2 ms-2" style={{...styles.buttons}} title="Delete From Cart" onClick={() => { deleteFromCart(food.id) }}
              >Delete From Cart</button>
            <p className="col-1">Item Total: {cartPrices[food.id].toFixed(2)}</p>
          </div>
        ))
    )
  }


  function cartTotal() {
    let total = 0
    for (const price of cartPrices) {
      total += price
    }
    return total.toFixed(2)
  }


  
  
  
  
  
  function checkOut() {
    return (
      <div className="">
        Customer:
        <input defaultValue={customer} className="m-2" onChange={(e) => setCustomer(e.target.value)}/>
        TOTAL PRICE: ${cartTotal()}
        <button className="m-2">Check Out</button>
      </div>
    )
  }





  return (
    <div className="d-flex justify-content-center">
      <div className="p-3" >
        <RestaurantName />
        <h1 style={{...styles.titles}}>Your Cart</h1>
        {populateCart(cart)}
        {checkOut()}
      </div>
      
    </div>
  )
}


export default Contact