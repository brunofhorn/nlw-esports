import { View } from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';
import { THEME } from '../../theme';
import { styles } from './styles';

export function Loading() {
  return (
    <View style={styles.container}>
      <PacmanIndicator color={THEME.COLORS.PRIMARY} size={65} />
    </View>
  );
}
