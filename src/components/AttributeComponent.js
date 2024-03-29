import React, { useReducer } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AttributeComponent = (props) => (
    <View style = {styles.container}>
      
      <TouchableOpacity onPress={props.onDecrease}>
        <Image style = {styles.image} source = {require('../../assets/minusSign.png')}
          />
      </TouchableOpacity>

      <Text style = {styles.text}>{`Current ${props.attribute}: ${props.value}`}</Text>      
      
      <TouchableOpacity onPress={props.onIncrease}>
        <Image style = {styles.image} source = {require('../../assets/plusSign.png')}
        />
      </TouchableOpacity>
      
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,      
    },
    text:{
      backgroundColor: 'rgba(255,255,255,.8)',
      fontWeight: 'bold',
      fontSize: 20,      
    },
    image: {
      width: 100,
      height: 100,
      margin: 20,
    },
  })

  export default AttributeComponent