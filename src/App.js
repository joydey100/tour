import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {

  let [loading, setLoading] = useState(true)
  let [tours, setTours] = useState([])

  let  removeTour = (id) => {
    let newTour = tours.filter(tour => tour.id !== id)
    setTours(newTour)
  }

  let fetchTours = async () => {
    setLoading(true)
    try {
    let response = await fetch(url)
    let tours = await response.json()    
    setLoading(false)
    setTours(tours)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    
  }

  useEffect(() => {
    fetchTours()
  }, [])

   if(loading){
    return <>
       <Loading />
    </>   
  }

  if(tours.length ===0){
    return <main>
      <div className="title">
        <h2> No Tour Left </h2>
        <button className="btn" onClick={() => fetchTours()}> Refresh </button>
      </div>
      
    </main>
  }

  return <main>
    <Tours tours={tours} removeTour={removeTour}/>
  </main>
}

export default App
