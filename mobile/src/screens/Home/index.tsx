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
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import logoImg from '../../assets/logo-nlw-esports.png';
import { PlusCircle } from 'phosphor-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ModalCreateAd } from '../../components/ModalCreateAd';
import { GameList } from '../../components/GameList';
import { GradientText } from '../../components/GradientText';

export function Home() {
  const [modal, setModal] = useState(false);

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
        <ModalCreateAd visible={modal} setVisible={setModal} />
        <ScrollView>
          <Image source={logoImg} style={styles.logo} />
          <Heading
            title={<TitleHeading />}
            subtitle='Selecione o game que deseja jogar...'
          />
          <GameList />
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
              <TouchableOpacity
                style={styles.bannerButton}
                onPress={() => setModal(true)}
              >
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
