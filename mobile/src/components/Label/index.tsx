import { Text } from 'react-native';
import { ILabel } from '../../interfaces';
import { styles } from './styles';

export function Label({ text }: ILabel) {
  return <Text style={styles.textLabel}>{text}</Text>;
}
