import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {CHARACTERS} from '../../utils/characters';
const CharacterChooser = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Character Chooser </Text>
      {CHARACTERS &&
        CHARACTERS.map((cha, index) => <Image key={index} source={cha.img} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});

export default CharacterChooser;
