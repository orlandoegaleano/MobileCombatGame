import React, { useReducer } from 'react';
import { ImageBackground, Button, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AttributeComponent from '../components/AttributeComponent';

//TODO: Stylize app better, replace the default assets with other ones


const monsterPool = [
    {
        name: 'Alien Wizard',
        health: 150,
        strength: 8,
        image: require('../../assets/alienWizard.png'),
        deathImage: require('../../assets/alienDead.png'),
    },
    {
        name: 'Dire Wolf',
        health: 75,
        strength: 20,
        image: require('../../assets/direWolf.png'),
        deathImage: require('../../assets/direWolfDead.png'),
    },
    {
        name: 'Blue Dragon' ,
        health: 250 ,
        strength: 15 ,
        image: require('../../assets/blueDragon.png'),
        deathImage: require('../../assets/blueDragonDead.png'),
    },
    {
        name: 'Gengar' ,
        health: 125 ,
        strength: 10 ,
        image: require('../../assets/gengar.png'),
        deathImage: require('../../assets/gengarDead.png'),
    },

];

const getRandomMonster = () => {
    const randomIndex = Math.floor(Math.random() * monsterPool.length);
    return monsterPool[randomIndex];
};

const initialState = {
    gameState: 'characterCreation',
    player: {
        strength: 10,
        health: 100,
        magic: 10,
        pointsRemaining: 15,
    },
    monster: getRandomMonster(),
    combatLog: 'A dangerous foe draws near!',
    continueButton: false,
    restartButton: false,
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
            tempState.player.health = 0;
            tempState.combatLog = "You have been defeated! Restart to play again.";
            tempState.restartButton = true;
        }

        if(tempState.monster.health <= 0){
            tempState.monster.health = 0;
            tempState.monster.image = tempState.monster.deathImage;
            tempState.combatLog = `You have killed the ${tempState.monster.name}!`;
            tempState.continueButton = true;
            tempState.player.magic = tempState.player.magic + 6;
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
                combatLog: `You dealt ${physicalDamage} physical damage to the ${monster.name}, and the ${monster.name} dealt ${monster.strength} physical damage to you!`,
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
                combatLog: `You dealt ${magicDamage} magic damage to the ${monster.name}, and the ${monster.name} dealt ${monster.strength} physical damage to you!`,
            }; 
            return deathCheck(tempState);
        case "CONTINUE_COMBAT":
            return {
                ...state,
                monster: getRandomMonster(),
                combatLog: initialState.combatLog,
                continueButton: false,
            }
        case "RESTART":
            return {
                ...state = initialState
            }                                          
        default:
            return state;
    }
};

const GameScreen = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {gameState, player, monster, combatLog} = state;
    
    //Character Creation Screen
    if (gameState === 'characterCreation') {
      return (
        <ImageBackground source = {require('../../assets/armory.png')} style = {styles.container}>
            <View style = {styles.container}>
            <Text style={styles.characterCreationText}>Assign your skill points:</Text>
            
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

            <Text style={styles.characterCreationText}>{`Points Remaining: ${player.pointsRemaining}`}</Text>

            {/*if the player has used all of their points, allow them to continue to combat */}
            {player.pointsRemaining === 0 ? 
                <Button title="Start Combat" onPress={() => dispatch({ type: 'START_COMBAT' })} />
                : null
            }
            </View>
        </ImageBackground>
      );
    } 

    //Combat Screen
    else if (gameState === 'combat') {
      return (
        <ImageBackground source={require('../../assets/forest.gif')} style={styles.container}>
            <View style = {styles.container}> 
                <View flexDirection='row'>
                    <View style={styles.stats}>
                    <Text style={styles.names}>{`${monster.name}'s Stats`}</Text>
                    <Text>{`Health: ${monster.health}`}</Text>
                    <Text>{`Strength: ${monster.strength}`}</Text>
                    </View>

                    <View style={styles.stats}>
                    <Text style={styles.names}>{"Player's Stats"}</Text>
                    <Text>{`Health: ${player.health}`}</Text>
                    <Text>{`Magic: ${player.magic}`}</Text>
                    <Text>{`Strength: ${player.strength}`}</Text>
                    </View>
                </View>

                <View style={styles.portraitContainer}>
                    <Image source = {monster.image} style={styles.portraits}/>
                </View>
                
                
                
                <View style={styles.logBox}>
                    <Text style={{fontWeight: 'bold'}}>{combatLog}</Text>
                </View>                   
                {/*If the continue combat button is on the screen, remove the player actions */}
                {state.continueButton ? null :
                <View style = {styles.iconContainer}>

                    <TouchableOpacity onPress={() => dispatch({ type: 'MELEE' })}>
                        <Image style = {styles.icons}
                        source = {require('../../assets/melee.png')}                        
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => dispatch({ type: 'MAGIC_MISSLE' })}>
                        <Image style = {styles.icons}
                        source = {require('../../assets/magicMissle.png')}                         
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => dispatch({ type: 'HEAL' })}>
                        <Image style = {styles.icons}
                        source = {require('../../assets/heal.png')}                        
                        />
                    </TouchableOpacity>                   

                </View>}

                <View style={{margin:10}}>
                    {state.continueButton ? 
                        <Button title="Continue Combat" onPress={() => dispatch({ type: 'CONTINUE_COMBAT'})}/> : null} 
                </View>

                <View style={{margin:10}}>
                    {state.restartButton ? 
                        <Button title="Restart" onPress={() => dispatch({ type: 'RESTART'})}/> : null} 
                </View>                         
                                    
            </View>
        </ImageBackground>
      );
    }
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    characterCreationContainer:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        
    },
    portraitContainer:{
        flex: 1,       
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 300,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    iconContainer:{
        flexDirection: 'row',        
        justifyContent: 'space-between',
        margin: 20,
        width: '80%',
    },
    icons: {
        height: 100,
        width: 100,
    },
    portraits:{
        height: 300,
        width: 300, 
        backgroundColor: 'rgba(0,0,0,0)',      
    },
    logBox: {
        width: 300,
        height: 100,
        borderWidth: 3,
        borderColor: 'rgb(0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,.7)',
    },
    stats:{
        width: 175,
        height: 100,
        borderWidth: 3,
        borderColor: 'rgb(0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,.7)',        
    },
    names:{
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        margin: 5,
    },
    characterCreationText:{
        backgroundColor: 'rgba(255,255,255,.8)',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default GameScreen;
