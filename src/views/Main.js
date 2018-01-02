import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';


const deviceWidth   = Dimensions.get('window').width;
const deviceHeight  = Dimensions.get('window').height - 84.0;

class Main extends Component {
    constructor(props) {
        super(props);

        // Listens to navigator events
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
          if (event.id === "all") {
            this.props.navigator.push({
                screen: "ReactCars.CarList",
                passProps: {
                    title: "all"
                }
            });
          }
        }
    }

    onPressButton = (title) => {
        this.props.navigator.push({
            screen: "ReactCars.CarList",
            title: title.toUpperCase(),
            passProps: {
                title: title
            }
        });
    }

    render() {
        let categories = [
            {"category": "vintage", "image": require("../images/vintage-car.png")}, 
            {"category": "luxury", "image": require("../images/luxury-car.png")}, 
            {"category": "sports", "image": require("../images/sports-car.png")},
            {"category": "racing", "image": require("../images/racing-car.png")}
        ];

        let carsArr = categories.map((item) => {
            let title = item.category;
            let image = item.image;

            return (
                <TouchableOpacity key={title} 
                    style={styles.item} 
                    onPress={() => this.onPressButton(title)} >
                    <Image source={image}
                        style={styles.image} />
                    <Text style={styles.textStyle}>
                        {title.toUpperCase()}
                    </Text>
                </TouchableOpacity>
            );
        })

        return (
            <View style={styles.container}>
                {carsArr}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap"
    },
    item: {
      width: deviceWidth / 2,
      height: deviceHeight / 2,
      padding: 1,
      marginBottom: 10
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined
    },
    textStyle: {
        textAlign: "center",
        color: "rgb(0,111,255)",
        fontSize: 16
    }
});

export default Main;