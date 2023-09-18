import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import GameScreen from "./src/screens/GameScreen";


const navigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Game: GameScreen,
  },
  {
    initialRouteName: "Welcome",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
