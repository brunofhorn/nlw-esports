import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';
import { api } from '../../services/api';
import { IDuoCard, IGames } from '../../interfaces';
import { ModalImage } from '../../components/ModalImage';
import { Ghost } from 'phosphor-react-native';
import { useApp } from '../../hooks/useApp';
import { Loading } from '../../components/Loading';

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as IGames;
  const [duos, setDuos] = useState<IDuoCard[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');
  const [modalImage, setModalImage] = useState(false);
  const [modalDiscord, setModalDiscord] = useState(false);
  const { isGamesLoading, setIsGamesLoading } = useApp();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getDiscordUser = async (adsId: string) => {
    const { data } = await api.get(`/ads/discord/${adsId}`);

    setDiscordDuoSelected(data.discord);
    setModalDiscord(true);
  };

  const getGameData = async () => {
    try {
      const { data } = await api.get(`/ads/game/${game.id}`);

      setDuos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsGamesLoading(false);
    }
  };

  useEffect(() => {
    setIsGamesLoading(true);
    getGameData();
  }, []);

  return (
    <Background>
      <ModalImage
        visible={modalImage}
        setVisible={setModalImage}
        title={game.title}
        bannerUrl={game.bannerUrl}
      />
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
        <ScrollView style={styles.scroll}>
          <TouchableOpacity onPress={() => setModalImage(true)}>
            <Image
              source={{ uri: game.bannerUrl }}
              style={styles.cover}
              resizeMode='cover'
            />
          </TouchableOpacity>
          <Heading
            title={<Text style={styles.title}>{game.title}</Text>}
            subtitle={'Conecte-se e comece a jogar!'}
          />
          {isGamesLoading ? (
            <Loading />
          ) : (
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
                <View style={styles.emptyList}>
                  <Ghost size={30} color='white' />
                  <Text style={styles.emptyListText}>
                    Não há anúncios publicados ainda.
                  </Text>
                </View>
              )}
            />
          )}
        </ScrollView>
        <DuoMatch
          visible={discordDuoSelected.length > 0 && modalDiscord}
          setVisible={setModalDiscord}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
