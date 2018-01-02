import React, { Component } from 'react';
import { View } from 'react-native';


const OutlineSection = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    ) 
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        flexDirection: "row",
        borderColor: "#ddd",
        position: "relative"
    }
};

export default OutlineSection;