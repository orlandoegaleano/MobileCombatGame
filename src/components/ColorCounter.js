import React, {useRef} from "react";
import {Text, Button, View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from "react-native";


const ColorCounter = (props) => {

    return (
        <View>
                <Text>{props.color}</Text>              
                
                <Button title= {`Increase ${props.color}`}
                onPress={props.onIncrease}
                />             
                               
                <Button title={`Decrease ${props.color}`}
                onPress={props.onDecrease}
                />
        </View>
    )

}

const styles = StyleSheet.create({});

export default ColorCounter