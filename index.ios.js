import { Navigation } from 'react-native-navigation';
import Main from './src/views/Main';
import CarList from './src/views/CarList';
import CarDetail from './src/views/CarDetail';


// Register Screens
Navigation.registerComponent("ReactCars.Main", () => Main);
Navigation.registerComponent("ReactCars.CarList", () => CarList);
Navigation.registerComponent("ReactCars.CarDetail", () => CarDetail);

// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "ReactCars.Main",
    title: "React Cars",
    navigatorStyle: { 
      navBarBackgroundColor: "rgb(0,111,255)",
      navBarTextColor: "rgb(255,255,255)",
      navBarTextFontSize: 22,
      navBarButtonColor: "rgb(255,255,255)"
    },
    navigatorButtons: {
      rightButtons: [
        {
          title: "All",
          id: "all",
          buttonColor: "rgb(255,255,255)", // Optional, iOS only.
          buttonFontSize: 16,
          buttonFontWeight: "600"
        }
      ]
    }
  }
});