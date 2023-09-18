import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ListScreen from "./src/screens/ListScreen";
import ComponentsScreen from "./src/screens/ComponentsScreen";
import ImageScreen from "./src/screens/ImageScreen";
import CounterScreen from "./src/screens/CounterScreen";
import ColorScreen from "./src/screens/ColorScreen";
import ColorAdjusterScreen from "./src/screens/ColorAdjusterScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    List: ListScreen,
    Components: ComponentsScreen,
    Image: ImageScreen,
    Counter: CounterScreen,
    Color: ColorScreen,
    ColorAdjuster: ColorAdjusterScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
