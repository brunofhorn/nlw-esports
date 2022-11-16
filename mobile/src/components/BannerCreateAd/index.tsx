import { PlusCircle } from 'phosphor-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import { ModalCreateAd } from '../ModalCreateAd';
import { useState } from 'react';
import { useApp } from '../../hooks/useApp';

export function BannerCreateAd() {
  const [modalCreateAd, setModalCreateAd] = useState(false);
  const { games } = useApp();

  if (games.length > 0) {
    return null;
  }

  return (
    <>
      <ModalCreateAd visible={modalCreateAd} setVisible={setModalCreateAd} />
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
            onPress={() => setModalCreateAd(true)}
          >
            <PlusCircle size={20} color='white' />
            <Text style={styles.bannerButtonText}>Publicar anúncio</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
}
