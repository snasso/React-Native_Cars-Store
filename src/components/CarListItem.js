import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Outline from './Outline';
import OutlineSection from './OutlineSection';
import Button from './Button';


const deviceWidth = Dimensions.get('window').width;

const CarListItem = (props) => {
    const { car_type, car_color, car_amount, car_description, car_image_url } = props.car;

    let carType     = toTitleCase(car_type);
    let imageWidth  = 120;
    let imageHeight = 120;

    if (deviceWidth < 375) {
        imageWidth  = 70;
        imageHeight = 70;
    }

    function toTitleCase(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    return (
        <TouchableOpacity onPress={() => props.listItemButtonPressed(props.car)}>
            <Outline>
                <OutlineSection>
                    <View style={styles.imageTextViewStyle}>
                        <Image style={{
                                    height: imageWidth, 
                                    width: imageHeight
                                }} 
                                source={{ uri: car_image_url }} />
                        <View style={styles.textContentStyle}>
                            <Text style={styles.headerTextStyle}>{carType}</Text>
                            <Text style={styles.detailsTextStyle}>{car_description}</Text>
                            <Text></Text>
                            <Text style={styles.detailsTextStyle}>${car_amount}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.iconContainerStyle}>
                        <Icon name="chevron-right" size={40} color="rgb(0,111,255)"/>
                    </View>
                </OutlineSection>
            </Outline>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    imageTextViewStyle: {
        flexDirection: "row",
        alignItems: "center"
    },
    textContentStyle: {
        flexDirection: "column",
        marginLeft: 10
    },
    headerTextStyle: {
        fontSize: 20, 
        color: "rgb(0,111,255)"
    },
    iconContainerStyle: {
        justifyContent: "center"
    },
    detailsTextStyle: {
        fontSize: 16
    }
});

export default CarListItem;