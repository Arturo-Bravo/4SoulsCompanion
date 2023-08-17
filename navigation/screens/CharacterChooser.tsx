import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet, Image, FlatList} from 'react-native';
import {CHARACTERS} from '../../utils/characters';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleCheck} from '@fortawesome/free-regular-svg-icons';
const CharacterChooser = () => {
  const [chosen, setChosen] = useState<number[]>([]);
  const [selected, setSelected] = useState<number>();

  const handlePress = useCallback((id: number) => {
    setChosen(prevChosen => {
      if (prevChosen.includes(id)) {
        return prevChosen.filter(value => value !== id);
      } else {
        return [...prevChosen, id];
      }
    });
    setSelected(id);
  }, []);

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Character Chooser </Text>
      <FlatList
        data={CHARACTERS}
        extraData={selected}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <View>
              {chosen.includes(item.id) && (
                <View style={styles.overlay}>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    color="blue"
                    size={40}
                  />
                </View>
              )}
              <Image
                style={[
                  styles.img,
                  chosen.includes(item.id)
                    ? styles.selected
                    : styles.unselected,
                  {marginRight: (item.id + 1) % 3 === 0 ? 0 : 10},
                ]}
                source={item.img}
              />
            </View>
          </TouchableOpacity>
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
  selected: {
    opacity: 0.5,
    zIndex: 1,
  },
  unselected: {
    opacity: 1,
  },
  overlay: {
    zIndex: 2,
    marginTop: 10,
    position: 'absolute',
    width: 100,
    height: 136,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'blue',
    borderWidth: 4,
    borderRadius: 7,
  },
});

export default CharacterChooser;
