import { useState } from 'react';
import { Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';
import { IDuoMatch } from '../../interfaces';
import { Modal } from '../Modal';
import Toast from 'react-native-toast-message';

export function DuoMatch({ visible, setVisible, discord, onClose }: IDuoMatch) {
  const [isCopping, setIsCopping] = useState(false);

  const handleCopyDiscordToClipboard = async () => {
    setIsCopping(true);

    await Clipboard.setStringAsync(discord);

    setIsCopping(false);
    setVisible(false);

    Toast.show({
      type: 'success',
      text1: 'Discord copiado com sucesso!',
      text2: 'O discord foi copiado para a sua área de transferência.',
    });
  };

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight='bold' />
      <Heading
        title={<Text style={styles.title}>Let's play!</Text>}
        subtitle='Agora é só começar a jogar!'
        style={{ alignItems: 'center', marginTop: 24 }}
      />
      <Text style={styles.label}>Adicione no Discord!</Text>
      <TouchableOpacity
        style={styles.discordButton}
        onPress={handleCopyDiscordToClipboard}
      >
        <Text style={styles.discord}>
          {isCopping ? (
            <ActivityIndicator color={THEME.COLORS.PRIMARY} />
          ) : (
            discord
          )}
        </Text>
      </TouchableOpacity>
    </Modal>
  );
}
