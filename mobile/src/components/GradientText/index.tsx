import { Text } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { IGradientText } from '../../interfaces';
import { styles } from './styles';

export function GradientText({ text }: IGradientText) {
  return (
    <MaskedView
      style={styles.maskedView}
      maskElement={<Text style={styles.text}>{text}</Text>}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#9572FC', '#43E7AD', '#E1D55D']}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
}
