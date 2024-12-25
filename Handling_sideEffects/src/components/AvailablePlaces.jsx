import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../../loc.js';
import { fetchAvailablePlaces } from '../../http.js';
import { useFetch } from '../../hook/useFetch.js';

async function fectchSortedPlaces(){
  const places = await fetchAvailablePlaces()

  return new Promise((resolve)=>{
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
    return resolve(sortedPlaces)
    });
  })

  
}


export default function AvailablePlaces({ onSelectPlace }) {

 const {error,isFetching,fetchedData:availablePlaces}= useFetch(fectchSortedPlaces,[])

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
