import React from "react";
import { ImageBackground, Button, Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";


const WelcomeScreen = ({navigation}) => {
    return (     
         
            <ImageBackground 
            style = {styles.container} source = {require("../../assets/continueForest.png")} resizeMode = "cover"                   
            >  
                <View style={styles.logoContainer}>
                    <Image 
                    style={{resizeMode:'contain', width: '90%'}}
                    source={require('../../assets/logo.png')}                
                    >
                    </Image>
                </View>                

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress = {() => {navigation.navigate("Game")}}>
                        <Image 
                        source={require('../../assets/continueButton.png')}
                        style={{justifyContent: 'center'}}
                        >
                        </Image>
                    </TouchableOpacity>
                </View>
                
            </ImageBackground>    
           
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'darkgrey', 
        flex: 1,  
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        
    },
    logoContainer: {
        position: 'absolute',
        top: 100,
        alignItems: 'center',
        width: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 100,
    },      
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 20
    }
});

export default WelcomeScreen