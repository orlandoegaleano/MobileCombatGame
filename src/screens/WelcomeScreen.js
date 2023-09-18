import React from "react";
import { ImageBackground, Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";


const WelcomeScreen = ({navigation}) => {
    return (        
        <ImageBackground 
        style = {styles.container} source = {require("../../assets/swordAndShield.jpg")}
        resizeMode = "contain"
        >
            <Button
            onPress = {() => {navigation.navigate("Game")}}
            title="Continue at your own peril"
            />
        </ImageBackground>        
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'darkgrey', 
        flex: 1,  
        justifyContent: 'center',
    },
    image: {
        //flex: 1,
        //justifyContent: 'center',
        height: 200,
        width: 200,
    },    
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 20
    }
});

export default WelcomeScreen