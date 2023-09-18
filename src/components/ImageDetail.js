import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";




const ImageDetail = (props) => {
    console.log(props);


    return ( 
        <TouchableOpacity onPress={() => {console.log("Why did you press that?!")}}>
            <View style={styles.container}>                
                    <Image style={styles.circleImage} source={props.imageSource}/>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>{props.price}</Text>              
            </View>
        </TouchableOpacity>     
        
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: 'lightgrey',
        justifyContent: 'space-between',
        width: '100%',
    },
    circleImage: {
        width: 100,  
        height: 100, 
        borderRadius: 50,         
    },
    title:{
        fontSize: 20,
    },
    price: {
        marginRight: 10,
        fontWeight: 'bold',
    },
    

});

export default ImageDetail