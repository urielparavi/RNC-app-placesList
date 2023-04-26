import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const region = {
    // Latitude and longitude will define the center of the map
    latitude: 37.78,
    longitude: -122.43,
    // Deltas will define how much content besides the center will be visible
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return <MapView style={styles.map} initialRegion={region}></MapView>;
};
export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
