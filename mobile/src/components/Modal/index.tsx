import { CheckCircle, X } from 'phosphor-react-native';
import { Modal as ModalRN, TouchableOpacity, View } from 'react-native';
import { IModal } from '../../interfaces';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../theme';

export function Modal({ visible, setVisible, children, ...rest }: IModal) {
  return (
    <ModalRN
      transparent
      statusBarTranslucent
      animationType='fade'
      {...rest}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => setVisible(false)}
          >
            <MaterialIcons
              name='close'
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </ModalRN>
  );
}
