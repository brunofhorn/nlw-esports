import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, ImageBackground, Text } from 'react-native';
import { IGameCard } from '../../interfaces';
import { THEME } from '../../theme';
import { styles } from './styles';

export function GameCard({ title, bannerUrl, _count, ...rest }: IGameCard) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={{ uri: bannerUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{title}</Text>
          <Text style={styles.ads}>{_count.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
