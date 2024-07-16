import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../redux/authSlice';
import { fetchNearbyStudents } from '../redux/userSlice';
import MyMap from './MyMap'; // Ensure this matches your actual Map component

const MetroMap = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const nearbyStudents = useSelector((state) => state.users.usersByMetro);
  const [coordinates, setCoordinates] = useState(null);
  const [metroCoordinates, setMetroCoordinates] = useState(null);
  const [zoom, setZoom] = useState(11);

  

  useEffect(() => {
    const fetchData = async () => {
      const userDetailsAction = await dispatch(fetchUserDetails());

      if (fetchUserDetails.fulfilled.match(userDetailsAction)) {
        const userData = userDetailsAction.payload;
        if (userData && userData.metro) {
          const metro = userData.metro.name;
          const metroCoords = userData.metro.coordinates.coordinates;
          setMetroCoordinates(metroCoords);
          await dispatch(fetchNearbyStudents(metro));
        }
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (user && user.location) {
      const { coordinates } = user.location;
      setCoordinates([coordinates[0], coordinates[1]]);
      setZoom(15); // Adjust the zoom level as needed
    }
  }, [user]);

  useEffect(() => {
    console.log('Current pathname:', location.pathname);

    if (location.pathname === '/some-specific-route') {
      // Do something specific
    }
  }, [location]);
   // Log the data to verify
   useEffect(() => {
    console.log('User:', user);
    console.log('Nearby Students:', nearbyStudents);
    console.log('Coordinates:', coordinates);
    console.log('Metro Coordinates:', metroCoordinates);
  }, [user, nearbyStudents, coordinates, metroCoordinates]);
  return (
    <div>
      {coordinates && metroCoordinates && (
        <MyMap
          center={coordinates}
          zoom={zoom}
          metroCoordinates={metroCoordinates}
          nearbyStudents={nearbyStudents}
          loggedInUser={user}
        />
      )}
    </div>
  );
};

export default MetroMap;
