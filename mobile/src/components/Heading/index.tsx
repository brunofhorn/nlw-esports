import { View, Text } from 'react-native';
import { styles } from './styles';
import { IHeading } from '../../interfaces';

export function Heading({ title, subtitle, ...rest }: IHeading) {
  return (
    <View style={styles.container} {...rest}>
      {title}
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
