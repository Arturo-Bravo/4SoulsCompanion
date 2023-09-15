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
    <View>
      <Text style={{color: 'black'}}>CharacterShuffler</Text>
      <View>
        {shuffledArray?.map((id, index) => (
          <View key={id}>
            <Text style={styles.text}>Player: {index + 1}</Text>
            <Image source={CHARACTERS[id].img} />
          </View>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

export default CharacterShuffler;
