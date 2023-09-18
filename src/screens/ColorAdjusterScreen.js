import React, { useState, useReducer } from "react";
import {Text, Button, View, StyleSheet, FlatList, Dimensions, TouchableWithoutFeedback } from "react-native";
import ColorCounter from "../components/ColorCounter";

const COLOR_INCREMENT = 20;

const reducer = (state, action) => {
    //state looks like: {red: number, green: number, blue: number}
    //action looks like: {colorToChange: "red" || "green" || "blue" , amount: 20 || -20}

    //ENDED HERE before getting to define colorToChange during lecture
    
    switch(action.colorToChange){
        case 'red':
            return {...state, red: state.red + action.amount};
        case ' blue':
            return{...state, green: state.green + action.amount};
        case 'green':
            return{...state, blue: state.blue + action.amount};
        default:
            return state;
    }
}



const ColorAdjusterScreen = () => {

    const [state, dispatch] = useReducer(reducer, {red: 0, green: 0, blue: 0});


    // const [red, setRed] = useState(0);
    // const [green, setGreen] = useState(0);
    // const [blue, setBlue] = useState(0);
    let colorString = `rgb(${red}, ${green}, ${blue})`;

    // const setColor = (color, change) => {
    //     if(color === 'red'){
    //         red + change < 0 || red + change > 255 ? null: setRed(red + change)
    //     }
    //     if(color === 'green'){
    //         green + change < 0 || green + change > 255 ? null: setRed(green + change)
    //     }
    //     if(color === 'blue'){
    //         blue + change < 0 || blue + change > 255 ? null: setRed(blue + change)
    //     }
    // }

   return( 
        <View>

            

            <Text>Color Adjuster Screen</Text>
            
            <ColorCounter color="Red"
            onIncrease={() => {}}
            onDecrease={() => {}}
            />
           
            <ColorCounter color="Green"
            onIncrease={() => {}}
            onDecrease={() => {}}
            />

            <ColorCounter color="Blue"
            onIncrease={() => {}}
            onDecrease={() => {}}
            />

            <View style = {{height: 100, width: 100, backgroundColor: colorString}}>

            </View>

        </View>
    )

}

const style = StyleSheet.create({

});

export default ColorAdjusterScreen