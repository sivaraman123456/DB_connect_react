export async function fetchingAvailablePlaces() {
    const response = await fetch("http://localhost:3000/places")
    if(!response.ok)
    {
      throw new Error('Failed to fetch the data')
     }
     const data =await response.json()

     return data.places;
}