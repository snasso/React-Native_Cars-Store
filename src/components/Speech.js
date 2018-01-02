import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Voice from 'react-native-voice';


export default class Speech extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            started: "",
            recognized: "",
            results: [],
            end: ""
        };
        Voice.onSpeechStart         = this.onSpeechStart.bind(this);
        Voice.onSpeechRecognized    = this.onSpeechRecognized.bind(this);
        Voice.onSpeechEnd           = this.onSpeechEnd.bind(this);
        Voice.onSpeechError         = this.onSpeechError.bind(this);
        Voice.onSpeechResults       = this.onSpeechResults.bind(this);
    }

    componentWillUnmount() {
        Voice.removeAllListeners;
        Voice.destroy();
    }

    onSpeechStart(e) {
        this.setState({
            started: "√"
        });
    }

    onSpeechRecognized(e) {
        this.setState({
            recognized: "√"
        });
    }

    onSpeechError(e) {
        try {
            Voice.destroy();
        } catch (e) {
            console.error(e);
        }
        this.setState({
            end: "√"
        });
    }

    onSpeechResults(e) {
        this.setState({
            results: e.value
        });
    }

    onSpeechEnd(e) {
        this.setState({
            end: "√"
        });
    }

    async _startRecognizing(e) {
        if ((this.state.started !== "" && this.state.end !== "")
            || (this.state.started === "" && this.state.end === "")) {

            this.setState({
                started: "",
                recognized: "",
                results: [],
                end: ""
            });
            try {
                await Voice.start('en-US');
            } catch (e) {
                console.error(e);
            }
        } else {
            try {
                await Voice.stop();

                this.props.micStopped(this.state.results);
            } catch (e) {
                console.error(e);
            }
        }
    }

    async _destroyRecognizer(e) {
        try {
            await Voice.destroy();
        } catch (e) {
            console.error(e);
        }
        this.setState({
            started: "",
            recognized: "",
            results: [],
            end: ""
        });
    }

    micClosePressed = () => {
        this.props.closeMic();
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.instructions}>
                        1. Press the red microphone button and start speaking.
                    </Text>
                    <Text style={styles.instructions}>
                        2. Results will display your message.
                    </Text>
                    <Text style={styles.instructions}>
                        3. Press the red microphone button when done.
                    </Text>
                </View>

                <View style={styles.startRecognizeContainerStyles}>
                    <Text
                        style={styles.stat}>
                        {`Started: ${this.state.started}`}
                    </Text>

                    <Text
                        style={styles.stat}>
                        {`Recognized: ${this.state.recognized}`}
                    </Text>

                    <Text
                        style={styles.stat}>
                        {`End: ${this.state.end}`}
                    </Text>
                </View>

                <Text
                    style={styles.resultTitleStyles}>
                    Results:
                </Text>
                {
                    this.state.results.map((result, index) => {
                        return (
                            <Text
                                key={`result-${index}`}
                                style={styles.resultStyle}>
                                [ {result} ]
                            </Text>
                        )
                    })
                }

                <View style={styles.buttonsContainerStyles}>
                    <TouchableHighlight onPress={this._destroyRecognizer.bind(this)}>
                        <Text
                            style={styles.action}>
                            Reset
                        </Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this._startRecognizing.bind(this)}>
                        {(this.state.started === "" && this.state.end === "")
                            || (this.state.started !== "" && this.state.end !== "")
                            ?   <Image
                                    style={styles.button}
                                    source={require('../images/red-mic.png')}
                                />
                            :   <Image
                                    style={styles.button}
                                    source={require('../images/white-mic.png')}
                                />
                        }
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this.micClosePressed}>
                        <Text
                            style={styles.action}>
                            Close
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  startRecognizeContainerStyles: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%"
  },
  action: {
    textAlign: "center",
    color: "rgb(255,255,255)",
    marginVertical: 5,
    fontWeight: "bold",
    backgroundColor: "rgb(0,111,255)",
    padding: 5
  },
  instructions: {
    color: "#333333",
    marginBottom: 5
  },
  stat: {
    textAlign: "center",
    color: "rgb(0,111,255)",
    marginBottom: 1
  },
  errorColor: {
      color: "#B0171F"
  },
  buttonsContainerStyles: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%"
  },
  resultTitleStyles: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 2,
    marginBottom: 1
  },
  resultStyle: {
    textAlign: "center",
    color: "rgb(0,111,255)",
    marginBottom: 1,
    fontSize: 16
  }
});