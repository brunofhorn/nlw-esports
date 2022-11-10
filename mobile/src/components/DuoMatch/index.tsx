import { useState } from 'react';
import { Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';
import { IDuoMatch } from '../../interfaces';
import { Modal } from '../Modal';

export function DuoMatch({ discord, onClose, ...rest }: IDuoMatch) {
  const [isCopping, setIsCopping] = useState(false);
  const [modal, setModal] = useState(false);

  const handleCopyDiscordToClipboard = async () => {
    setIsCopping(true);

    await Clipboard.setStringAsync(discord);

    setIsCopping(false);
    Alert.alert(
      'Usuário copiado!',
      'Usuário copiado para sua área de transferência para você colocar no Discord e encontrar essa pessoa.'
    );
  };

  return (
    <Modal visible={modal} setVisible={setModal}>
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
