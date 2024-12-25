import Places from "./Places"
import { useEffect, useState } from "react"
const AvailablePlaces = ({onSelectPlace}) => {

// here we want to write the fetching data API request
const [availablePlaces, setAailablePlaces] = useState([])

useEffect(()=>{
    fetch("http://localhost:3000/places").then((response)=>{
       return response.json()
    }).then((rData)=>{
       setAailablePlaces(rData.places)
    })
},[])


  return (
   <Places
     title="Available Places"
     places={availablePlaces}
     fallbackText="No places available."
   onSelectPlace={onSelectPlace}
   />
  )
}

export default AvailablePlaces
