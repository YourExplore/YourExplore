import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
/*in order to use the Text, View, Image, etc. features
we have to import them from their respective modules
StatusBar would be imported from 'expo-status-bar'
React from 'react and etc. for others*/

export default function getUserLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  let text = 'text';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
};