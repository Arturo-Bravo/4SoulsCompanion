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

type CharacterFilter = 'all' | 'regular' | 'tainted';

const CharacterChooser = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [chosen, setChosen] = useState<number[]>([]);
  const [numPlayers, setNumPlayers] = useState<string>('');
  const [selected, setSelected] = useState<number>();
  const [filter, setFilter] = useState<CharacterFilter>('all');

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

  const handleFilterSelect = useCallback((filterType: CharacterFilter) => {
    setFilter(filterType);

    // Select all characters that match the filter
    const characterIds = CHARACTERS.filter(char => {
      if (filterType === 'regular') return !char.tainted;
      if (filterType === 'tainted') return char.tainted;
      return true; // 'all' filter
    }).map(char => char.id);

    setChosen(characterIds);
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
      <View style={styles.filterWrapper}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'regular' && styles.filterButtonActive,
            ]}
            onPress={() => handleFilterSelect('regular')}>
            <Text
              style={[
                styles.filterButtonText,
                filter === 'regular' && {color: 'white'},
              ]}>
              Regular
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'tainted' && styles.filterButtonActive,
            ]}
            onPress={() => handleFilterSelect('tainted')}>
            <Text
              style={[
                styles.filterButtonText,
                filter === 'tainted' && {color: 'white'},
              ]}>
              Tainted
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              styles.filterButtonLast,
              filter === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => handleFilterSelect('all')}>
            <Text
              style={[
                styles.filterButtonText,
                filter === 'all' && {color: 'white'},
              ]}>
              All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
      <View style={styles.inputContainer}>
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
  filterWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 0,
    overflow: 'hidden',
    width: '75%',
  },
  filterButton: {
    width: 100, // Fixed width for each button
    height: 44,
    borderWidth: 0,
    borderRightWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  filterButtonLast: {
    borderRightWidth: 0, // Remove right border for the last button
  },
  filterButtonActive: {
    // Make this a dark red
    backgroundColor: '#8B0000',
  },
  filterButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
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
  inputContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
