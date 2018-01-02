import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';


const Button = (props) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity style={buttonStyle} 
            onPress={props.onPress}>
            <Text style={textStyle}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: 'rgb(0,111,255)',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgb(0,111,255)',
        marginLeft: 5,
        marginRight: 5
    }
}

export default Button;