import React from "react";
import { Text, StyleSheet } from "react-native";

const ComponentsScreen = () => {
  return <Text style={styles.text}>
    Orlando Galeano {'\n'}
      <Text style={styles.smallerText}>
      I visited the Cosmic Campgrounds and saw the bare night sky for the first time this summer.
      I also did a lot of hiking on that trip which leads me to my favorite app, AllTrails. 
      It is an app that stores trail maps and allows you to track your gps along your trail routes. 
      It has a ton of good features such as downloading your maps for offline use, lots of different types of maps like topographical and satellite, and the ability to set waypoints to track your route.
      It also has a strong community that offers feedback on live trail conditions allowing you to better plan your trips.
      </Text>
    
  </Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
  smallerText: {
    fontSize: 25,
  },
});

export default ComponentsScreen;
