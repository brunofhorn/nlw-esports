import { View, Text } from 'react-native';
import { styles } from './styles';
import { IHeading } from '../../interfaces/components';
import { GradientText } from '../GradientText';

export function Heading({ subtitle, ...rest }: IHeading) {
  return (
    <View style={styles.container} {...rest}>
      <View style={styles.containerGradient}>
        <Text style={styles.title}>O seu</Text>
        <GradientText text='duo' />
        <Text style={styles.title}>está aqui!</Text>
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
