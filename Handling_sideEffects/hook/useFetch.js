import { useEffect,useState } from "react";

export function useFetch(fetchFn,initialValue)  // passing function as a parameter
{
    // maintain the state for fetching data.
    const [isFetching, setIsFetching] = useState()
    const [error, setError] = useState()
    const [fetchedData, setFetchedData] = useState(initialValue)
    useEffect(() => {
        async function fetchPlaces() {
          setIsFetching(true);
          try {
            const places = await fetchFn();
            setFetchedData(places);
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch user places.' });
          }
    
          setIsFetching(false);
        }
    
        fetchPlaces();
      }, [fetchFn]);

      return {
        error,
        fetchedData,
        setFetchedData,
        isFetching
      }   // I return the grouped data
}