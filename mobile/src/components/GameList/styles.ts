import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  contentList: {
    paddingLeft: 32,
    paddingRight: 64,
    marginBottom: 30,
  },
  emptyList: {
    marginBottom: 30,
    paddingLeft: 32,
    width: '100%',
    paddingRight: 32,
  },
  textEmptyList: {
    color: 'white',
    fontSize: THEME.FONT_SIZE.MD,
  },
});
