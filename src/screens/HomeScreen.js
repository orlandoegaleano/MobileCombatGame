import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";

const HomeScreen = ({navigation}) => {
  //console.log(props);

  return <View>

        <Text style={styles.text}>
        Orlando's Class Lectures Application        

        </Text>   
        <Text style={[styles.text, styles.smallerText]}>
        Navigation Page           
        </Text>


        <Button
        onPress={() => {navigation.navigate("Components"); console.log("The Button component has been pressed")}} 
        title="Components Screen"         
        />
        

        {/* <TouchableOpacity onPress={() => {navigation.navigate("List"); console.log("Now the TouchableOpacity component has been pressed!")}}>
          <Text>ListScreen</Text>
        </TouchableOpacity> */}

        <Button
        onPress = {() => {navigation.navigate("List")}}
        title="List Screen"
        />

        <Button
        onPress={() => {navigation.navigate("Image")}}
        title="Image Screen"
        />

        <Button
        onPress={() => {navigation.navigate("Counter")}}
        title="Counter Screen"
        />

        
        <Button
        onPress={() => {navigation.navigate("Color")}}
        title="Color Screen"
        />

        <Button
        onPress={() => {navigation.navigate("ColorAdjuster")}}
        title="Color Adjuster Screen"
        />

      </View>
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

export default HomeScreen;
