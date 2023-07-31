import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
const CharacterChooser = () => {
    return (
        <View style={styles.main} >
            <Text style={styles.text}>Character Chooser aaa</Text>
        </View>
    )
}

const styles = StyleSheet.create({
main : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
},
text: {
    color: 'black'
}
});

export default CharacterChooser;