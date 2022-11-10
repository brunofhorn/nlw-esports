import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.OVERLAY,
  },
  title: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BLACK,
  },
  content: {
    width: '95%',
    backgroundColor: THEME.COLORS.SHAPE,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
});
