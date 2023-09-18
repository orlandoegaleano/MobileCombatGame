import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

const teacherList = [
    {name: "Ben"},
    {name: "Ted"},
    {name: "Orlando"},
    {name: "Matt"},
    {name: "James"},
];


const ListScreen = () => {
    return (<FlatList 
        data={teacherList} 
        renderItem={({item}) =>{
            return <Text> {item.name} </Text>
          }
        }
      />
    )

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
  
  export default ListScreen;