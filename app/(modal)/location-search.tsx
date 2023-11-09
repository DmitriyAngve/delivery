import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
// process.env.EXPO_PUBLIC_GOOGLE_API_KEY

const LocationSearch = () => {
  //   const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 59.9342802,
    longitude: 30.3350986,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <View style={{ flex: 1 }}>
      <MapView style={styles.map} region={location}></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default LocationSearch;
