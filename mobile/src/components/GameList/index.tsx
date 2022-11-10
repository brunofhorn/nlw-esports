import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useApp } from '../../hooks/useApp';
import { IGames } from '../../interfaces';
import { api } from '../../services/api';
import { GameCard } from '../GameCard';
import { Loading } from '../Loading';
import { styles } from './styles';

export function GameList() {
  const { games, setGames, isGamesLoading, setIsGamesLoading } = useApp();
  const { navigate } = useNavigation();

  const handleOpenGame = ({ id, title, bannerUrl, _count }: IGames) => {
    navigate('game', { id, title, bannerUrl, _count });
  };

  const getGames = async () => {
    try {
      setIsGamesLoading(true);
      const { data } = await api.get('/games');

      setGames(data);
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
      contentContainerStyle={styles.contentList}
    />
  );
}
