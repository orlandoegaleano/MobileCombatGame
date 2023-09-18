import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ImageDetail from "../components/ImageDetail";

const ImageScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Brunch Menu</Text>
            <ImageDetail title="Doughnut" price="1.50" imageSource={require('../../assets/doughnut.jpeg')}/>
            <ImageDetail title="Breakfast Sandwhich" price="5.50" imageSource={require('../../assets/sandwhich.jpeg')}/>
            <ImageDetail title="Coffee" price="3.50" imageSource={require('../../assets/coffee.jpeg')}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'darkgrey',   
    },
    
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 20
    }
});

export default ImageScreen