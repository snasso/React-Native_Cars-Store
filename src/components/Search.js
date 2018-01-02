import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const deviceWidth = Dimensions.get('window').width;

const Search = (props) => {
    return (
        <View style={styles.searchBarStyles}>
            <View style={styles.searchIconStyles}>
                <Icon name="search" size={20} color="rgb(162,162,162)"/>
            </View>

            <TextInput 
                style={{ height: 40,
                    width: deviceWidth - 80,
                    borderColor: 'gray',
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    padding: 10
                }}
                autoCapitalize="none"
                placeholder="Type search here"
                onChangeText={(text) => props.textChanged({text})}
            />

            <TouchableOpacity onPress={props.micOpenPressed}>
                <View style={styles.micStyles}>
                    <Icon name="mic" size={30} color="rgb(255,255,255)"/>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarStyles: {
        flexDirection: "row"
    },
    searchIconStyles: {
        height: 40,
        borderColor: "gray",
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        padding: 10,
        paddingTop: 10,
        paddingBottom: 0
    },
    micStyles: {
        height: 40,
        backgroundColor: "rgb(0,111,255)",
        padding: 5
    }
});

export default Search;