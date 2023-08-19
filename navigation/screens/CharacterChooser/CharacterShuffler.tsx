import {Text, View, StyleSheet, Image, FlatList, Button} from 'react-native';
import {RouteProp} from '@react-navigation/native';

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
  const {characters, numPlayers} = props.route.params;
  console.log(props.route.params);
  return (
    <View>
      <Text style={{color: 'black'}}>CharacterShuffler</Text>
      <Text style={{color: 'black'}}>
        characters: {characters} number of players: {numPlayers}{' '}
      </Text>
    </View>
  );
};

export default CharacterShuffler;
