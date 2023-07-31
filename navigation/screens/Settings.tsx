import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
const Settings = () => {
    return (
        <View style={styles.main}>
            <Text>Settings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
main : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'blue'
}
});

export default Settings;