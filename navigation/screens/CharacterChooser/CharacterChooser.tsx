import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Button,
  Dimensions,
} from 'react-native';
import {CHARACTERS} from '../../../utils/characters';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleCheck} from '@fortawesome/free-regular-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './CharacterShuffler';
const {width} = Dimensions.get('window');

const CharacterChooser = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [chosen, setChosen] = useState<number[]>([]);
  const [numPlayers, setNumPlayers] = useState<string>('');
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

  const navigateToNewScreen = useCallback(() => {
    navigation.navigate('CharacterShuffler', {
      characters: chosen,
      numPlayers: numPlayers,
    }); // Navigate to the NewScreen within the stack navigator
  }, [navigation, chosen, numPlayers]);

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
                    color="#91B8D0"
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
      <TextInput
        keyboardType="numeric"
        value={numPlayers}
        onChangeText={text =>
          text === ''
            ? setNumPlayers('')
            : setNumPlayers(parseInt(text, 10).toString())
        }
        style={[styles.input]}
      />
      <Button
        title="Shuffle the Characters"
        disabled={numPlayers === '' || chosen.length === 0}
        onPress={navigateToNewScreen}
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
  },
  input: {
    color: 'black',
    width: (width * 4) / 9,
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 2,
    marginVertical: 5,
  },
});

export default CharacterChooser;
