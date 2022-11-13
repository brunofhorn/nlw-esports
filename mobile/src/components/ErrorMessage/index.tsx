import { WarningCircle } from 'phosphor-react-native';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface ErrorMessageProps {
  message: string | undefined | null;
}

export function ErrorMessage({ message = '' }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <WarningCircle size={17} color='red' />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
