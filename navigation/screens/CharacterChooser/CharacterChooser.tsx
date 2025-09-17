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
    // setTimeout(function () {
    navigation.navigate('CharacterShuffler', {
      characters: chosen,
      numPlayers: numPlayers,
    }); // Navigate to the NewScreen within the stack navigator
    // }, 2000);
  }, [navigation, chosen, numPlayers]);

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Choose Your Characters</Text>
      <FlatList
        data={CHARACTERS}
        extraData={selected}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handlePress(item.id)}
            style={styles.itemContainer}>
            <View style={{position: 'relative'}}>
              <Image
                style={[
                  styles.img,
                  chosen.includes(item.id)
                    ? styles.selected
                    : styles.unselected,
                ]}
                source={item.img}
              />
              {chosen.includes(item.id) && (
                <View style={styles.overlay}>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    color="#91B8D0"
                    size={22}
                  />
                </View>
              )}
            </View>
            <Text style={{color: 'black', fontSize: 14}}>{item.name}</Text>
          </TouchableOpacity>
          // <View>
          //   <Image
          //     source={require('../../../Images/back-plates/CharacterCardBack.png')}
          //   />
          // </View>
        )}
        keyExtractor={item => `${item.id}`}
      />
      <View style={{padding: 16}}>
        <TextInput
          placeholder="Number of players"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={numPlayers}
          onChangeText={text =>
            text === ''
              ? setNumPlayers('')
              : setNumPlayers(parseInt(text, 10).toString())
          }
          style={styles.input}
        />
        <Button
          title="Shuffle the Characters"
          disabled={numPlayers === '' || chosen.length === 0}
          onPress={navigateToNewScreen}
          color="#91B8D0"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    width: '100%',
  },
  img: {
    width: 44,
    height: 60,
    borderRadius: 4,
    marginRight: 10,
  },
  selected: {
    opacity: 0.5,
  },
  unselected: {
    opacity: 1,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
  },
  input: {
    color: 'black',
    width: (width * 4) / 9,
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 2,
    marginVertical: 5,
    padding: 8,
    textAlign: 'center',
  },
});

export default CharacterChooser;
