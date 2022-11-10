import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  selectButton: {
    backgroundColor: THEME.COLORS.BACKGROUND_800,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
  },
  selectTextButton: {
    color: THEME.COLORS.CAPTION_400,
  },
});
