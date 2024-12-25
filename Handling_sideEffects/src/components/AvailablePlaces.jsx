import Error from "./Error"
import Places from "./Places"
import { useEffect, useState } from "react"
const AvailablePlaces = ({onSelectPlace}) => {

// here we want to write the fetching data API request
const [availablePlaces, setAailablePlaces] = useState([])
const [isFetching,setIsFetching]=useState(false)
const [error ,setError]=useState('')
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
  try {
    setIsFetching(true)
    const response = await fetch("http://localhost:3000/placesf")
    if(!response.ok)
    {
      throw new Error('Failed to fetch the data')
    }
    const data =await response.json()
    console.log("data>>:",data);
    setAailablePlaces(data.places)
    
  } catch (error) {
    setError({message:error.message|| 'Could not fetch the data '})
  }
  setIsFetching(false)

}

fetchingData()

},[])

if(error)
{
  console.log("error:",error);
  
  return <div className="flex flex-col justify-center items-center">
<Error title="An error occured..!" message={error.message}  />
  </div> 
}
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
