import { Button, Text, TouchableOpacity, View } from 'react-native';
import { IModal } from '../../interfaces';
import { Modal } from '../Modal';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PickerModal from 'react-native-picker-modal-view';
import { useState } from 'react';
import { IModalListInDto } from 'react-native-picker-modal-view/dist/Interfaces';

const schema = yup
  .object()
  .shape({
    user: yup.string().required('é obrigatório'),
  })
  .required();

export function ModalCreateAd({ visible, setVisible }: IModal) {
  const [gameSelected, setGameSelected] = useState<IModalListInDto>();
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

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const selecionar = (data: any) => {
    console.log(data);
    setGameSelected(data);
    return data;
  };

  const fechar = () => {
    console.log('fechou');
  };

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <View style={{ width: '100%' }}>
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
          Publique um anúncio
        </Text>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'white', fontSize: 17 }}>Qual o game?</Text>
          <PickerModal
            renderSelectView={(disabled, selected, showModal) => (
              <Button
                disabled={disabled}
                title={'Show me!'}
                onPress={showModal}
              />
            )}
            onSelected={selecionar}
            onClosed={fechar}
            items={[
              { Id: 1, Name: 'Bruno', Value: '1' },
              { Id: 1, Name: 'Sara', Value: '2' },
            ]}
            sortingLanguage={'tr'}
            showToTopButton={true}
            selected={gameSelected}
            showAlphabeticalIndex={true}
            autoGenerateAlphabeticalIndex={true}
            selectPlaceholderText={'Choose one...'}
            onEndReached={() => console.log('list ended...')}
            searchPlaceholderText={'Search...'}
            requireSelection={false}
            autoSort={false}
          />
          {errors.user && <Text>{errors.user?.message as string}</Text>}
        </View>
        <TouchableOpacity onPress={handleSubmit(handleCreateAd)}>
          <Text style={{ color: 'white' }}>ENVIAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text>FECHAR</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
