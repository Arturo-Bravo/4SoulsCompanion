import {Text, View, StyleSheet, Image, FlatList, Button} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {CHARACTERS} from '../../../utils/characters';

export type RootStackParamList = {
  CharacterShuffler: {
    characters: number[];
    numPlayers: string;
  };
};

interface IProps {
  route: RouteProp<RootStackParamList, 'CharacterShuffler'>;
}

const CharacterShuffler = (props: IProps) => {
  const [shuffledArray, setShuffledArray] = useState<number[] | null>(null);
  const {characters, numPlayers} = props.route.params;

  const shuffleArray = useCallback(() => {
    const shuffledArray = [...characters]; // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    setShuffledArray(shuffledArray.slice(0, +numPlayers));
  }, [characters]);

  useEffect(() => {
    shuffleArray();
  }, [characters, numPlayers]);
  return (
    <View style={styles.main}>
      <View>
        <FlatList
          style={styles.flatList}
          data={shuffledArray}
          renderItem={({item, index}) => (
            <View>
              <Text style={styles.text}>Player: {index + 1}</Text>
              <Image
                style={[
                  styles.img,
                  {marginRight: (index + 1) % 3 === 0 ? 0 : 10},
                ]}
                source={CHARACTERS[item].img}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}></FlatList>
      </View>
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
  flatList: {
    marginHorizontal: 'auto',
  },
  img: {
    marginTop: 10,
    width: 100,
    height: 136,
    borderRadius: 7,
  },
});

export default CharacterShuffler;
