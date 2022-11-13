import PickerModal from 'react-native-picker-modal-view';
import { CaretDown } from 'phosphor-react-native';
import { TouchableOpacity, Text, View } from 'react-native';
import { useApp } from '../../hooks/useApp';
import { styles } from './styles';
import { THEME } from '../../theme';

export function SelectGames() {
  const { gamesFormated, gameSelected, setGameSelected } = useApp();
  const selectGame = (data: any) => {
    setGameSelected(data);
    return data;
  };

  return (
    <PickerModal
      renderSelectView={(disabled, selected, showModal) => (
        <TouchableOpacity
          disabled={disabled}
          onPress={showModal}
          style={styles.selectButton}
        >
          <Text style={styles.selectTextButton}>
            {selected.Name
              ? selected.Name
              : 'Selecione o game que deseja jogar...'}
          </Text>
          <CaretDown size={20} color={THEME.COLORS.CAPTION_300} />
        </TouchableOpacity>
      )}
      showAlphabeticalIndex={true}
      onClosed={() => {}}
      onSelected={selectGame}
      items={gamesFormated}
      autoGenerateAlphabeticalIndex
      showToTopButton
      onEndReached={() => {}}
      searchPlaceholderText='Digite o nome do jogo...'
      selected={gameSelected}
    />
  );
}
