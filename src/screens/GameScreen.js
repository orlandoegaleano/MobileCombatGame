import React, { useReducer } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AttributeComponent from '../components/AttributeComponent';

//TODO: Stylize app better, replace the assets used with better ones, create a pool of monsters to choose from


const monsterPool = [
    {
        name: 'Alien Wizard',
        health: 100,
        strength: 5,
        image: require('../../assets/alienWizard.png')
    },
    {
        name: 'Dire Wolf',
        health: 100,
        strength: 5,
        image: require('../../assets/direWolf.png'),
    },
    {
        name: 'Blue Dragon' ,
        health: 100 ,
        strength: 5 ,
        image: require('../../assets/blueDragon.png'),
    },
    {
        name: 'Gengar' ,
        health: 100 ,
        strength: 5 ,
        image: require('../../assets/gengar.png'),
    },

];
//LEFTOFF HERE TO PICKUP ALEX
const getRandomMonster = {
    const random = Math.floor(Math.random() * );
};

const initialState = {
    gameState: 'characterCreation',
    player: {
        strength: 5,
        health: 10,
        magic: 5,
        pointsRemaining: 15,
    },
    monster: {
        name: 'Alien Wizard',
        health: 100,
        strength: 5,
        image: require('../../assets/alienWizard.png'),
    },
    combatLog: 'A dangerous foe draws near!',
};

const reducer = (state, action) => {
    //destructuring state
    const { player, monster } = state;

    const physicalDamage = player.strength * 4;
    const magicDamage = player.magic * 2;
    //deathCheck is run after every player action to see if either the player or the monster have died
    const deathCheck = (newState) => {
        let tempState = {...newState};

        if(tempState.player.health <= 0){
            tempState.combatLog = "You have been defeated";
        }

        if(tempState.monster.health <= 0){
            tempState.monster.health = 0;
            tempState.monster.image = require('../../assets/monsterDead.png');
            tempState.combatLog = "You have killed the monster";
        }

        return tempState;
    }

    switch (action.type) {             
        case 'INCREASE_ATTRIBUTE':
            if (player.pointsRemaining > 0) {
                return {
                    ...state,
                    player: {                        
                        ...player,
                        //dynamically setting the prop name using [ ] around action.attribute
                        [action.attribute]: player[action.attribute] + 1,
                        pointsRemaining: player.pointsRemaining - 1,
                    },
                };
            }
            return state;       
        case 'DECREASE_ATTRIBUTE':
            if (player[action.attribute] > 5) {
                return {
                    ...state,
                    player: {
                        ...player,
                        [action.attribute]: player[action.attribute] - 1,
                        pointsRemaining: player.pointsRemaining + 1,
                    },
                };
            } 
            return state;       
        case 'START_COMBAT':
            return {
                ...state,
                gameState: 'combat',
            };        
        case 'MELEE':  
            tempState = {
                ...state,
                monster: {
                    ...monster,
                    health: monster.health - physicalDamage,
                },
                player:{
                    ...player,
                    health: player.health - monster.strength,
                },
                combatLog: `You dealt ${physicalDamage} physical damage to the monster, and the monster dealt ${monster.strength} physical damage to you!`,
            }          
            return deathCheck(tempState) ;
        case "HEAL":
            if(player.magic - 4 < 0){
                return{
                    ...state,
                    combatLog: 'You do not have enough magic to cast that!',
                }
            };    
            tempState = {
                ...state,
                player: {
                    ...player,
                    health: player.health + (player.magic * 2),
                    magic: player.magic - 4,
                },
                combatLog: `You healed yourself for ${(player.magic * 2)} health points!`,
            }               
            return deathCheck(tempState);                
        case "MAGIC_MISSLE":            
            if(player.magic - 2 < 0){
                return{
                    ...state,
                    combatLog: 'You do not have enough magic to cast that!',
                }
            }; 
            tempState = {
                ...state,                    
                monster: {
                    ...monster,
                    health: monster.health - magicDamage,
                },
                player: {
                    ...player,
                    health: player.health - monster.strength,
                    magic: player.magic - 2,
                },
                combatLog: `You dealt ${magicDamage} magic damage to the monster, and the monster dealt ${monster.strength} physical damage to you!`,
            }; 
            return deathCheck(tempState);                                          
        default:
            return state;
    }
};

const GameScreen = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {gameState, player, monster, combatLog} = state;
    
    // Character Creation Screen
    if (gameState === 'characterCreation') {
      return (
        <View style = {styles.container}>
          <Text>Assign your skill points:</Text>
          
          <AttributeComponent
            attribute="strength"
            value={player.strength}
            onIncrease={() => dispatch({ type: 'INCREASE_ATTRIBUTE', attribute: 'strength' })}
            onDecrease={() => dispatch({ type: 'DECREASE_ATTRIBUTE', attribute: 'strength' })}
          />
         
          <AttributeComponent
            attribute="health"
            value={player.health}
            onIncrease={() => dispatch({ type: 'INCREASE_ATTRIBUTE', attribute: 'health' })}
            onDecrease={() => dispatch({ type: 'DECREASE_ATTRIBUTE', attribute: 'health' })}
          />
        
          <AttributeComponent
            attribute="magic"
            value={player.magic}
            onIncrease={() => dispatch({ type: 'INCREASE_ATTRIBUTE', attribute: 'magic' })}
            onDecrease={() => dispatch({ type: 'DECREASE_ATTRIBUTE', attribute: 'magic' })}
          />

          <Text>{`Points Remaining: ${player.pointsRemaining}`}</Text>

          {/*if the player has used all of their points, allow them to continue to combat */}
          {player.pointsRemaining === 0 ? 
            <Button title="Start Combat" onPress={() => dispatch({ type: 'START_COMBAT' })} />
            : null
          }
        </View>
      );
    } 

    // Combat Screen
    else if (gameState === 'combat') {
      return (
        <View style = {styles.container}>            
            <View>
                <Text>{`Monster Health: ${monster.health}`}</Text>
                <Text>{`Player Health: ${player.health}`}</Text>
                <Text>{`Player Magic: ${player.magic}`}</Text>
                <Image source = {monster.image}/>
                <Text>{combatLog}</Text>
                <View style = {styles.icons}>

                    <TouchableOpacity onPress={() => dispatch({ type: 'MELEE' })}>
                        <Image 
                        source = {require('../../assets/attackIcon.png')}                        
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => dispatch({ type: 'MAGIC_MISSLE' })}>
                        <Image 
                        source = {require('../../assets/fireIcon.png')}                         
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => dispatch({ type: 'HEAL' })}>
                        <Image 
                        source = {require('../../assets/healIcon.png')}                        
                        />
                    </TouchableOpacity>

                </View>               
            </View>                      
        </View>
      );
    }
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icons:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
    },
});

export default GameScreen;
