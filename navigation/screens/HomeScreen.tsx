import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  CharacterChooser: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const Home = ({navigation}: Props) => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Home</Text>
      {/* <Button title='Character Choose' onPress={() => {
                navigation.navigate('CharacterChooser')
            }}/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  text: {
    color: 'black',
  },
});

export default Home;
