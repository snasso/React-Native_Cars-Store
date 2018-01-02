import React, { Component } from 'react';
import { View, Text, Image, Dimensions, Alert } from 'react-native';
import axios from 'axios';
import { TextToSpeech } from 'react-native-watson';
import stripe from 'tipsi-stripe'; // Stripe client integration
import Outline from '../components/Outline';
import OutlineSection from '../components/OutlineSection';
import Button from '../components/Button';
import { NLU_Username, NLU_Password, TTS_Username, TTS_Password } from './../../accessKeys.json';

/* IBM Watson */
TextToSpeech.initialize( TTS_Username, TTS_Password );

// Stripe initialization
stripe.init({
    publishableKey: 'pk_test_rsn6gZfw0gsQUc4tKBUwuMCS', // Public Key
    androidPayMode: 'test' // Optional, android only, 'production' by default
});

const deviceWidth = Dimensions.get('window').width;

const CarDetail = (props) => {
    const { id, car_category, car_type, car_color, car_amount, car_description, car_image_url } = props.car;

    let carId       = id;
    let carType     = toTitleCase(car_type);
    let imageHeight = 300;

    if (deviceWidth < 375) {
        imageHeight = 270;
    }

    function toTitleCase(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    
    buttonPressed = () => {
        TextToSpeech.synthesize( "Please confirm your purchase details." );

        // Works on both iOS and Android
        Alert.alert(
            "Purchase details:",
            `${car_category.toUpperCase()} - ${carType} (${car_color})`,
            [
                {text: 'Cancel', onPress: () => this.purchaseCancelled(), style: 'cancel'},
                {text: 'OK', onPress: () => this.showStripeModal()}
            ],
            { cancelable: false }
        );
    }

    purchaseCancelled = () => {
        TextToSpeech.synthesize( "Cancelling purchase." );
    }

    showStripeModal = () => {
        TextToSpeech.synthesize( "Please enter your card details and press done when completed or cancel to exit." );

        stripe.paymentRequestWithCardForm()
            .then(response => {
                // Send the tokenId from the response and send to server
                axios.post('http://127.0.0.1:8080/create-charge', {
                        tokenId: response.tokenId,
                        carId: carId,
                        category: car_category,
                        type: car_type,
                        color: car_color,
                        amount: car_amount
                    }).then(function (response) {
                        console.log(response);

                        if (response.data.error !== undefined)
                        {   
                            Alert.alert(
                                "We're sorry. We could not complete your purchase.",
                                "Please check your card and try again.",
                                [
                                    {text: 'OK'}
                                ],
                                { cancelable: false }
                            );
                        } else {
                            Alert.alert(
                                "Congratulations on your purchase:",
                                `${car_category.toUpperCase()} - ${carType} (${car_color})`,
                                [
                                    {text: 'OK'}
                                ],
                                { cancelable: false }
                            );
                        }

                    }).catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(error => {
                // Handle error
                console.log(error)
            });
    }

    return (
        <Outline>
            <OutlineSection>
                <Image style={{
                        flex: 1,
                        height: imageHeight,
                        width: null
                    }}
                    source={{ uri: car_image_url }} />
            </OutlineSection>

            <OutlineSection>
                <View style={styles.headerContentStyle}>
                    <Text style={styles.headerTextStyle}>{carType}</Text>
                    <Text style={styles.detailsTextStyle}>{car_description}</Text>
                </View>
            </OutlineSection>

            <OutlineSection>
                <Button onPress={this.buttonPressed}>
                    ${car_amount}
                </Button>
            </OutlineSection>
        </Outline>
    );
};

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        width: "100%"
    },
    headerTextStyle: {
        fontSize: 24,
        color: 'rgb(0,111,255)'
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    detailsTextStyle: {
        fontSize: 16
    }
}

export default CarDetail;