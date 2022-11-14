import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: THEME.COLORS.TEXT,
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BLACK,
    marginLeft: 0,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 28,
    justifyContent: 'space-between',
  },
  logo: {
    width: 72,
    height: 40,
  },
  scroll: {
    width: '100%',
  },
  right: {
    width: 20,
    height: 20,
  },
  cover: {
    width: '85%',
    height: 160,
    borderRadius: 8,
    marginTop: 32,
    alignSelf: 'center',
  },
  containerList: {
    width: '100%',
  },
  contentList: {
    paddingLeft: 32,
    paddingRight: 64,
    alignItems: 'flex-start',
  },
  emptyList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyListText: {
    color: THEME.COLORS.CAPTION_300,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.BLACK,
    marginLeft: 10,
  },
  emptyListContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
