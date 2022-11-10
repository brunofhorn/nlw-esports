import { Text, View } from 'react-native';
import { IDuoInfo } from '../../interfaces';
import { THEME } from '../../theme';
import { styles } from './styles';

export function DuoInfo({
  label,
  value,
  colorValue = THEME.COLORS.TEXT,
}: IDuoInfo) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: colorValue }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}
