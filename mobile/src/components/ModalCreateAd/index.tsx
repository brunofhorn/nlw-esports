import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IModal } from '../../interfaces';
import { Modal } from '../Modal';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GameController } from 'phosphor-react-native';
import { styles } from './styles';
import { THEME } from '../../theme';
import { Label } from '../Label';
import { SelectGames } from '../SelectGame';

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('O campo nome é obrigatório.')
      .min(3, 'O valor mínimo é 3 caracteres.'),
    yearsPlaying: yup
      .number()
      .min(0, 'É preciso preencher um valor neste campo')
      .max(90, 'Não é possível ter mais de 90 anos só de jogos.'),
  })
  .required();

export function ModalCreateAd({ visible, setVisible }: IModal) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreateAd = (data: any) => {
    console.log(data);
  };

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <View style={{ width: '100%' }}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
          Publique um anúncio
        </Text>
        <View style={{ marginTop: 25 }}>
          <Label text='Qual o game?' />
          <SelectGames />
          <Label text='Seu nome (ou nickname)' />
          <Controller
            name='name'
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder='Como te chamam dentro do game?'
                placeholderTextColor={THEME.COLORS.CAPTION_400}
              />
            )}
          />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flex: 1, marginRight: 5 }}>
              <Label text='Joga há quantos anos?' />
              <Controller
                name='yearsPlaying'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    style={styles.input}
                    placeholder={'Tudo bem ser ZERO'}
                    placeholderTextColor={THEME.COLORS.CAPTION_400}
                  />
                )}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Label text='Qual é o teu discord?' />
              <Controller
                name='discord'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    style={styles.input}
                    placeholder={'Usuario#8080'}
                    placeholderTextColor={THEME.COLORS.CAPTION_400}
                  />
                )}
              />
            </View>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelTextButton}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit(handleCreateAd)}
            style={styles.duoButton}
          >
            <GameController
              color='white'
              size={25}
              style={styles.duoIconButton}
            />
            <Text style={styles.duoTextButton}>Encontrar duo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
