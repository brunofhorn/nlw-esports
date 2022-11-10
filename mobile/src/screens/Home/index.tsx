import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { GameList } from '../../components/GameList';
import { GradientText } from '../../components/GradientText';
import { BannerCreateAd } from '../../components/BannerCreateAd';

export function Home() {
  const TitleHeading = () => {
    return (
      <View style={styles.containerGradient}>
        <Text style={styles.title}>O seu</Text>
        <GradientText text='duo' />
        <Text style={styles.title}>está aqui!</Text>
      </View>
    );
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image source={logoImg} style={styles.logo} />
          <Heading
            title={<TitleHeading />}
            subtitle='Selecione o game que deseja jogar...'
          />
          <GameList />
          <BannerCreateAd />
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
