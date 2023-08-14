import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, FlatList} from 'react-native';
import {CHARACTERS} from '../../utils/characters';
const CharacterChooser = () => {
  const [chosen, setChosen] = useState([]);

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Character Chooser </Text>
      <FlatList
        data={CHARACTERS}
        renderItem={({item}) => (
          <Image
            style={[
              styles.img,
              {marginRight: (item.id + 1) % 3 === 0 ? 0 : 10},
            ]}
            source={item.img}
          />
        )}
        keyExtractor={item => `${item.id}`}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'scroll',
    marginBottom: 10,
  },
  text: {
    color: 'black',
  },
  img: {
    marginTop: 10,
    width: 100,
    height: 136,
    borderRadius: 7,
  },
});

export default CharacterChooser;
