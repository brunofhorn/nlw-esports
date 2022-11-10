import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 214,
    height: 120,
    marginTop: 74,
    marginBottom: 48,
    alignSelf: 'center',
  },
  containerGradient: {
    flexDirection: 'row',
  },
  title: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BLACK,
  },
});
