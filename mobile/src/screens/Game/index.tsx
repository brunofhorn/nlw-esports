import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';
import { api } from '../../services/api';
import { IDuoCard, IGames } from '../../interfaces';

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as IGames;
  const [duos, setDuos] = useState<IDuoCard[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getDiscordUser = async (adsId: string) => {
    const { data } = await api.get(`/ads/discord/${adsId}`);
    setDiscordDuoSelected(data.discord);
  };

  const getGameData = async () => {
    const { data } = await api.get(`/ads/game/${game.id}`);

    setDuos(data);
  };

  useEffect(() => {
    getGameData();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleGoBack()}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode='cover'
        />
        <Heading
          title={<Text style={styles.title}>{game.title}</Text>}
          subtitle={'Conecte-se e comece a jogar!'}
        />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard {...item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            duos.length > 0 ? styles.contentList : styles.emptyListContent
          }
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
