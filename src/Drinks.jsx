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
  }
}


function Drinks() {
  const [menu, setMenu] = useState([]);
  const [drinks, setDrinks] = useState([]);
  


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/menu_items/`)
    .then(response => {
      setMenu(response.data)
      setDrinks(response.data.filter((x) => x.category === "Drinks").map((food) => {
        return (
          <div key={food.id} style={{...styles.items}} className="row">
            <h3 className="">{food.title}</h3>
            <p className="col-10">{food.description}</p>
            <p className="col-2">{food.price}</p>
          </div>
        )
      }))
  }
  )})



  return (
    <div className="d-flex justify-content-center">
      <div className="p-3">
        <RestaurantName />
        <h1 style={{...styles.titles}}>Drinks</h1>
        {drinks}
      </div>
    </div>
  )
}


export default Drinks
