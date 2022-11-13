import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  daysButton: {
    backgroundColor: THEME.COLORS.BACKGROUND_900,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 6,
  },
  daysButtonText: {
    color: 'white',
    fontSize: 17,
  },
});
