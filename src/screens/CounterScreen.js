import React, { useState } from "react";
import {Text, Button, View, StyleSheet, } from "react-native";

const CounterScreen = () => {
   
    const [counter, setCounter] = useState(0);

    return (
    <View>

        <Button title="Increase" onPress={()=>{
            setCounter(counter + 1);

        }}/>

        <Button title="Decrease" onPress={()=>{
            setCounter(counter - 1);

        }}/>

        <Text style={styles.text}>Current count:{counter} </Text>  

    </View>  
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 50,
        textAlign: 'center',
    },
});

export default CounterScreen