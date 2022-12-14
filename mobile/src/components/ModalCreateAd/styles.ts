import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  discordLoginButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    borderRadius: 6,
    marginVertical: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  discordLoginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: THEME.COLORS.BACKGROUND_800,
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    color: 'white',
  },
  daysButtonView: {
    marginVertical: 10,
    flexDirection: 'row',
  },

  actionButtons: {
    marginTop: 12,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  cancelTextButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: THEME.COLORS.CAPTION_500,
    marginRight: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
    justifyContent: 'center',
  },
  duoIconButton: {
    marginRight: 5,
  },
  duoTextButton: {
    fontWeight: 'bold',
    color: 'white',
  },
  duoButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  discordButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    borderRadius: 4,
    padding: 6,
    position: 'absolute',
    right: 9,
    top: 50,
  },
});
