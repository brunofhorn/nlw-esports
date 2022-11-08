import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import { api } from '../../services/api';
import logoImg from '../../assets/logo-nlw-esports.png';
import { PlusCircle } from 'phosphor-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate('game', { id, title, bannerUrl });
  };

  const getGames = async () => {
    const { data } = await api.get('/games');

    setGames(data);
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image source={logoImg} style={styles.logo} />
          <Heading subtitle='Selecione o game que deseja jogar...' />
          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <GameCard data={item} onPress={() => handleOpenGame(item)} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#9572FC', '#43E7AD', '#E1D55D']}
            style={styles.containerBannerGradient}
          >
            <View style={styles.containerBanner}>
              <Text style={styles.bannerTitle}>Não encontrou seu duo?</Text>
              <Text style={styles.bannerSubtitle}>
                Publique um anúncio para{'\n'}encontrar novos players!
              </Text>
              <TouchableOpacity style={styles.bannerButton}>
                <PlusCircle size={20} color='white' />
                <Text style={styles.bannerButtonText}>Publicar anúncio</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
