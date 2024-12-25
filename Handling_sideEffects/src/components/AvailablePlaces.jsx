import Places from "./Places"
import { useEffect, useState } from "react"
const AvailablePlaces = ({onSelectPlace}) => {

// here we want to write the fetching data API request
const [availablePlaces, setAailablePlaces] = useState([])
const [isFetching,setIsFetching]=useState(false)
// useEffect(()=>{
//     fetch("http://localhost:3000/places").then((response)=>{
//        return response.json()
//     }).then((rData)=>{
//        setAailablePlaces(rData.places)
//     })
// },[])
useEffect(()=>{

async function fetchingData()
{
  setIsFetching(true)
  const response = await fetch("http://localhost:3000/places")
  const data =await response.json()
  console.log("data>>:",data);
  setIsFetching(false)
  setAailablePlaces(data.places)
}

fetchingData()

},[])


  return (
   <Places
     title="Available Places"
     isLoadig={isFetching}
     loadingText="Fetching place data"
     places={availablePlaces}
     fallbackText="No places available."
   onSelectPlace={onSelectPlace}
   />
  )
}

export default AvailablePlaces
