import { useNavigation } from '@react-navigation/native';
import { Ghost } from 'phosphor-react-native';
import { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useApp } from '../../hooks/useApp';
import { IGames, IGamesFormated } from '../../interfaces';
import { api } from '../../services/api';
import { GameCard } from '../GameCard';
import { Loading } from '../Loading';
import { styles } from './styles';

export function GameList() {
  const {
    games,
    setGames,
    isGamesLoading,
    setIsGamesLoading,
    setGamesFormated,
  } = useApp();
  const { navigate } = useNavigation();

  const handleOpenGame = ({ id, title, bannerUrl, _count }: IGames) => {
    navigate('game', { id, title, bannerUrl, _count });
  };

  const getGames = async () => {
    try {
      setIsGamesLoading(true);
      const { data } = await api.get('/games');

      setGames(data);

      let newGames = [] as IGamesFormated[];

      data.map((game: IGames) => {
        newGames.push({
          Id: game.id,
          Name: game.title,
          Value: game.id,
        });
      });

      setGamesFormated(newGames.sort((a, b) => (a.Name < b.Name ? -1 : 1)));
    } catch (error) {
      console.log(error);
    } finally {
      setIsGamesLoading(false);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  if (isGamesLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <GameCard {...item} onPress={() => handleOpenGame(item)} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={
        games.length > 0 ? styles.contentList : styles.emptyList
      }
      ListEmptyComponent={() => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            flex: 1,
          }}
        >
          <Ghost size={30} color='white' />
          <Text style={styles.textEmptyList}>
            Não há nenhum jogo cadastrado ainda.
          </Text>
        </View>
      )}
    />
  );
}
