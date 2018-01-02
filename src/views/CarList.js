import React, { Component } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NaturalLanguageUnderstanding, TextToSpeech } from 'react-native-watson';
import CarListItem from '../components/CarListItem';
import Search from '../components/Search';
import Speech from '../components/Speech';
import { NLU_Username, NLU_Password, TTS_Username, TTS_Password } from './../../accessKeys.json';

/* IBM Watson */
NaturalLanguageUnderstanding.initialize( NLU_Username, NLU_Password );
TextToSpeech.initialize( TTS_Username, TTS_Password );

class CarList extends Component {
    constructor(props) {
        super(props);

        this.state = {
          dataSource: [],
          micOpenPressed: false
        };
    }

    componentWillMount() {
        let title = this.props.title

        if (title === "all") {
            this.httpRequest("http://127.0.0.1:8080/cars/");
        } else {
            this.httpRequest(`http://127.0.0.1:8080/cars/${title}`);
        }
    }

    listItemButtonPressed = (car) => {
        this.props.navigator.push({
            screen: "ReactCars.CarDetail",
            passProps: {
                car: car
            }
        });
    }

    textChanged = (str) => {
        let title = this.props.title;

        if (str.text !== "" && str.text.length !== 0) {
            this.httpRequest(`http://127.0.0.1:8080/cars/search/${title}/${str.text}`);
        } else if (this.props.title !== "all") {
            this.httpRequest(`http://127.0.0.1:8080/cars/${title}`);
        } else {
            this.httpRequest("http://127.0.0.1:8080/cars/");
        }
    }

    /* Natural Language Understanding */
    speechTextReceived = (speechText) => {
        let contentToAnalyze = {
            text: speechText
        }
        let features = {
            keywords: {
                limit: 2
            }
        }
        NaturalLanguageUnderstanding.analyzeContent( contentToAnalyze, features )
           .then(results => {
                console.log(results);

                let keywordsLength = results.keywords.length;

                let text = results.keywords[0].text;
                if (keywordsLength > 1) {
                    text = `${text} ${results.keywords[1].text}`;
                }

                this.textChanged({ "text": text });
           })
           .catch(error => {
               console.log( "Error: " + error.message )
           });
    }

    httpRequest = (address) => {
        axios.get(address)
            .then((response) => {
                this.setState({ dataSource: response.data });
            });
    }

    micOpenPressed = () => {
        this.setState({
            micOpenPressed: true
        }, () => TextToSpeech.synthesize( "Press the red microphone to start. Press again to stop." ));
    }

    micStopped = (result) => {
        let _newResult      = String(result);
        let resultLength    = _newResult.length;

        TextToSpeech.synthesize( `Searching for ${_newResult}.` );

        if (resultLength > 14) {
            this.speechTextReceived(_newResult);
        } else {
            this.textChanged({ "text": result });
        }
    }

    closeMic = () => {
        this.setState({
            micOpenPressed: false
        }, () => this.textChanged({ text: "" }));
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Search textChanged={this.textChanged} micOpenPressed={this.micOpenPressed}/>
            
            { (this.state.micOpenPressed === true) 
                ?   <Speech micStopped={this.micStopped} closeMic={this.closeMic}/>
                : null 
            }

                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <CarListItem car={item} listItemButtonPressed={this.listItemButtonPressed}/>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

export default CarList;