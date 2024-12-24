import Places from "./Places"

const AvailablePlaces = ({onSelectPlace}) => {

// here we want to write the fetching data API request

  return (
   <Places
     title="Available Places"
     fallbackText="No places available."
   onSelectPlace={onSelectPlace}
   />
  )
}

export default AvailablePlaces
