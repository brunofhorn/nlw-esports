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
  containerBanner: {
    backgroundColor: '#2A2634',
    padding: 20,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  containerBannerGradient: {
    marginHorizontal: 33,
    paddingTop: 7,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: 30,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  bannerTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  bannerSubtitle: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 14,
    marginVertical: 5,
  },
  bannerButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: THEME.COLORS.PRIMARY,
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
  },
  bannerButtonText: {
    color: 'white',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
});
