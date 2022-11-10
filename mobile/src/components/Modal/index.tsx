import { X } from 'phosphor-react-native';
import { Modal as ModalRN, TouchableOpacity, View } from 'react-native';
import { IModal } from '../../interfaces';
import { styles } from './styles';

export function Modal({ visible, setVisible, children }: IModal) {
  return (
    <ModalRN
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.closeModal}
          >
            <X size={30} color='#52525B' />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </ModalRN>
  );
}
