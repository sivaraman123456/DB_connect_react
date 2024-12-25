import Error from "./Error";
import Places from "./Places";
import { useEffect, useState } from "react";
import { sortPlacesByDistance } from "../../loc";
import { fetchingAvailablePlaces } from "../../http";
const AvailablePlaces = ({ onSelectPlace }) => {
  // here we want to write the fetching data API request
  const [availablePlaces, setAailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchingData() {
      try {
        setIsFetching(true);
        const data = await fetchingAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            data,
            position.coords.latitude,
            position.coords.longitude
          );
          setAailablePlaces(sortedPlaces);
          setIsFetching(false); // it take sometime to set the sorted distance tha's why I Put the seIsfetching false here
        });

        console.log("data>>:", data);
      } catch (error) {
        setError({ message: error.message || "Could not fetch the data " });
      }
      setIsFetching(false);
    }

    fetchingData();
  }, []);

  if (error) {
    console.log("error:", error);

    return (
      <div className="flex flex-col justify-center items-center">
        <Error title="An error occured..!" message={error.message} />
      </div>
    );
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
  );
};

export default AvailablePlaces;
