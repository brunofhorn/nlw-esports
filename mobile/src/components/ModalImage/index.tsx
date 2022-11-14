import { Modal } from '../Modal';
import { ScrollView, Text, Image } from 'react-native';
import { IModalImage } from '../../interfaces';
import { styles } from './styles';

export function ModalImage({
  visible,
  setVisible,
  bannerUrl,
  title,
}: IModalImage) {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <ScrollView style={styles.scroll}>
        <Image
          source={{ uri: bannerUrl }}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.title}>{title}</Text>
      </ScrollView>
    </Modal>
  );
}
