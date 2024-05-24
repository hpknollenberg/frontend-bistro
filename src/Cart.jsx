import RestaurantName from './restaurant-name'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

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

function Cart() {  
  
  let tempAddress = JSON.parse(localStorage.getItem('address'))
  let tempCustomer = JSON.parse(localStorage.getItem("customer"))
  let tempCartAmounts = JSON.parse(localStorage.getItem("cartAmounts"))
  let tempCartPrices = JSON.parse(localStorage.getItem("cartPrices"))
  let tempCart = JSON.parse(localStorage.getItem("cart"))


  const [address, setAddress] = useState(tempAddress ? tempAddress : "")
  const [customer, setCustomer] = useState(tempCustomer ? tempCustomer : "")
  const [cartAmounts, setCartAmounts] = useState(tempCartAmounts ? tempCartAmounts : [])
  const [cartPrices, setCartPrices] = useState(tempCartPrices ? tempCartPrices : [])
  const [cart, setCart] = useState(tempCart ? tempCart : [])

  const [orderId, setOrderId] = useState("")


  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address))
  }, [address])

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
    setCartPrices(
        cartPrices.map((price, index) => {
          if (index === id) {
            return 0
          } else {
            return price
          }
        })
    )
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



  useEffect(() => {
    let newCart = cart.map((food) => {
      food.qty = 1
      console.log(food)
      return food
    })
    console.log(newCart)
    setCart(newCart)
  }, [])

  function updateQty(foodItem, qty) {
    console.log(foodItem, qty)
    let newCart = cart.map((el) => {
      if (el.id === foodItem.id) {
        if (qty && qty >= 1) {
          el.qty = Number(qty)
        } else {
          el.qty = Number(qty)
        }
      }
      return el
    })
    setCart(newCart)    
  }

  const PopulateCart = () => {
    console.log('pop cart')
    return (
      cart.map((food) => {
          const [qty, setQty] = useState(food.qty)
          return (
          <div key={food.id} style={{...styles.items}} className="row"> {/*Displays food item title, description, and price*/}
            <h3 className="col-5">{food.title}</h3>
            <p className="col-1">{food.price}</p>
            <input value={qty} type="number" min="1" className="col-1" onChange={e => setQty(e.target.value)} onBlur={(e) => updateQty(food, qty)} /> 
            <button className="col-2 ms-2" style={{...styles.buttons}} title="Delete From Cart" onClick={() => { deleteFromCart(food.id) }}
              >Delete From Cart</button>
            <p className="col-1">Item Total: {food.price * food.qty}</p>
          </div>
        )
      })
    )
  }


  function cartTotal() {
    let total = 0
    for (const price of cartPrices) {
      total += price
    }
    return total
  }


  
  
  
  function checkOut() {
    
    axios.post(`http://127.0.0.1:8000/customers/`, {
      name: customer,
      address: address
    }).then((response) => {
      axios.post(`http://127.0.0.1:8000/orders/`, {
        customer: response.data.id
      })
      .then((response) => {
        cart.map((food) => {
          axios.post(`http://127.0.0.1:8000/order_items/`, {
            order: response.data.id,
            menu_item: food.id,
            quantity: food.qty
          })
        })
      })
    })

    setCart([])

  }
    
  
  
  
  
  function checkOutSection() {
    return (
      <div className="">
        Customer:
        <input defaultValue={customer} className="m-2" onChange={(e) => setCustomer(e.target.value)}/>
        Address:
        <input defaultValue={address} className="m-2" onChange={(e) => setAddress(e.target.value)}/>
        <br></br>
        {/* TOTAL PRICE: ${cartTotal()} */}
        TOTAL PRICE: ${cart.reduce(function(a,b){return a + Number(b.price * b.qty)}, 0)}
        <button className="m-2" onClick={() => checkOut()}>Check Out</button>
        
        
      </div>
    )
  }




  return (
    <div className="d-flex justify-content-center">
      <div className="p-3" >
        <RestaurantName />
        <h1 style={{...styles.titles}}>Your Cart</h1>
        {/* {populateCart()} */}
        <PopulateCart />
        {checkOutSection()}
      </div>
      
    </div>
  )
}


export default Cart